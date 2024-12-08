import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from 'src/app/services/firebase.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  userName: string | null = null;
  constructor(private navCtrl: NavController, private firebaseService: FirebaseService) {}

  
  navigateTo(page: string) {
    this.navCtrl.navigateForward(`/${page}`);
  }

  logout() {
    console.log("Cerrando sesión...");
    this.navCtrl.navigateRoot('/auth'); // Regresa a la página de login
  }

  async ngOnInit() {
    try {
      // Obtén el usuario autenticado
      const user = await this.firebaseService.auth.currentUser;
      if (user) {
        // Llama a getUserName con el UID del usuario
        this.userName = await this.firebaseService.getUserName(user.uid);
      }
    } catch (error) {
      console.error('Error en ngOnInit:', error);
    }
  }
}