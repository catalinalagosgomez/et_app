import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FirebaseService } from 'src/app/services/firebase.service';
import QRCode from 'qrcode';
import { NavController } from '@ionic/angular';

interface Asignatura {
  name: string;
  profesorId: string;
  duracionClases:number;
}

interface CodigoQR {
  asignatura: string;
  identificacion: string;
  profesor: string;
  timestamp: string;
  duracionClases: number;

}

@Component({
  selector: 'app-docenteqr',
  templateUrl: './docenteqr.page.html',
  styleUrls: ['./docenteqr.page.scss'],
})export class DocenteqrPage implements OnInit {
  selectedAsignatura: string | undefined;
  qrCodeData: string | null = null;
  qrCodeId: string | null = null;

  profesorId: string | null = null;
  userName: string | null = null;
  asignaturas: { name: string; profesorId: string; duracionClases: number }[] = [];

  constructor(
    private firestore: AngularFirestore,
    private firebaseService: FirebaseService,
    private navController: NavController
  ) {}

  ngOnInit() {
    this.obtenerProfesor();
  }

  volver() {
    this.navController.back(); 
  }

  async obtenerProfesor() {
    try {
      const user = await this.firebaseService.auth.currentUser;
      if (user) {
        this.profesorId = user.uid;
        this.userName = await this.firebaseService.getUserName(this.profesorId);
        console.log('Profesor ID:', this.profesorId);
        console.log('Profesor Name:', this.userName);
        this.loadAsignaturas();
      } else {
        console.error('No hay usuario autenticado');
      }
    } catch (error) {
      console.error('Error al obtener el profesor:', error);
    }
  }

  loadAsignaturas() {
    if (!this.profesorId) return;

    this.firestore
      .collection<Asignatura>('asignaturas', (ref) =>
        ref.where('profesorId', '==', this.profesorId)
      )
      .get()
      .subscribe(
        (snapshot) => {
          this.asignaturas = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              ...data,
              duracionClases: data.duracionClases ?? 0, // Asegúrate de que `duracionClases` se obtiene correctamente
              name: data.name || 'Nombre no disponible', // Asignar nombre por defecto
            };
          });
          console.log('Asignaturas del profesor:', this.asignaturas);
        },
        (error) => {
          console.error('Error al cargar las asignaturas:', error);
        }
      );
  }

  async generateQR() {
    if (!this.profesorId) {
      alert('Por favor, inicia sesión antes de generar el código QR.');
      return;
    }

    if (this.selectedAsignatura) {
      try {
        // Encontrar el objeto de asignatura correspondiente
        const asignatura = this.asignaturas.find(
          (a) => a.name === this.selectedAsignatura // Asegúrate de que `name` sea el campo que contiene el nombre de la asignatura
        );

        if (!asignatura) {
          alert('Asignatura no encontrada.');
          return;
        }

        // Obtener la duración de las clases
        const duracionClases = asignatura.duracionClases ?? 0;

        this.qrCodeId = this.firestore.createId();
        this.qrCodeData = await QRCode.toDataURL(this.qrCodeId);

        // Guardar QR junto con duracionClases
        await this.saveQRToFirestore(this.qrCodeId, this.selectedAsignatura, duracionClases);

        console.log('Código QR generado para la asignatura:', this.selectedAsignatura);
      } catch (error) {
        console.error('Error al generar el código QR:', error);
        alert('Hubo un problema al generar el código QR. Por favor, inténtalo nuevamente.');
      }
    } else {
      alert('Por favor selecciona una asignatura para generar el código QR.');
    }
  }

  private async saveQRToFirestore(qrId: string, asignatura: string, duracionClases: number) {
    try {
      const chileTime = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' });
      const qrData: CodigoQR = {
        asignatura: asignatura,
        identificacion: qrId,
        profesor: this.userName || 'Desconocido',
        timestamp: chileTime,
        duracionClases: duracionClases, // Guardamos la duracionClases
      };

      await this.firestore.collection('codigoQR').doc(qrId).set(qrData);
      console.log('Datos del QR guardados en Firestore');
    } catch (error) {
      console.error('Error al guardar los datos del QR en Firestore:', error);
      alert('Error al guardar el código QR en Firestore.');
    }
  }
}
