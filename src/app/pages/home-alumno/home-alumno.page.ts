import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-home-alumno',
  templateUrl: './home-alumno.page.html',
  styleUrls: ['./home-alumno.page.scss'],
})
export class HomeAlumnoPage {
  userName: string | null = null;
  constructor(private navCtrl: NavController, private toastController: ToastController,  private firebaseService: FirebaseService) {}

  async navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  async logout() {
   
    console.log('Cerrar sesión');

    this.navCtrl.navigateRoot('/login');
  }
  async ngOnInit() {
    try {
      // Obtén el usuario autenticado
      const user = await this.firebaseService.auth.currentUser;
      if (user) {
        // Llama a getUserName con el UID del usuario
        this.userName = await this.firebaseService.getUserNameUsers(user.uid);
      }
    } catch (error) {
      console.error('Error en ngOnInit:', error);
    }
  }
}
