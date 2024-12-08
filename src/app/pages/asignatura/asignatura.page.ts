import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.page.html',
  styleUrls: ['./asignatura.page.scss'],
})
export class AsignaturaPage  {
  asignaturaForm: FormGroup;
  profesorId: string | null = null; 
  userName: string | null = null;
  
  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private navController: NavController, 
    private firestore: AngularFirestore 

  )
   {
    this.asignaturaForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      duracionClases: [0, [Validators.required, Validators.min(0), Validators.max(85)]], // Valor inicial 0
    });
  }
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
      } else {
        console.error('No hay usuario autenticado');
      }
    } catch (error) {
      console.error('Error al obtener el profesor:', error);
    }
  }

  agregarAsignatura() {
    console.log('Formulario válido:', this.asignaturaForm.valid);
    console.log('Profesor ID:', this.profesorId);

    if (this.asignaturaForm.valid && this.profesorId) {
      const { name, duracionClases } = this.asignaturaForm.value;

      const asignaturaId = this.firestore.createId();

      

      const nuevaAsignatura = {
        id: asignaturaId,
        name,
        profesorId: this.profesorId,
        profesorName: this.userName,
        duracionClases
      };

      this.firebaseService.addAsignatura(nuevaAsignatura)
        .then(() => {
          console.log('Asignatura agregada correctamente con ID:', asignaturaId);
          
          this.asignaturaForm.reset();
        })
        .catch((error) => {
          console.error('Error al agregar asignatura:', error);
        });
    } else {
      console.error('Profesor ID no disponible o formulario no válido');
    }
  }
}