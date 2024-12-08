import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage {
  currentPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';

  constructor(private alertCtrl: AlertController, private router: Router) {}

  async changePassword() {
    
    if (!this.newPassword || !this.confirmNewPassword) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Por favor, ingresa la nueva contraseña y su confirmación.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

  
    if (this.newPassword !== this.confirmNewPassword) {
      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Las contraseñas no coinciden.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    const successAlert = await this.alertCtrl.create({
      header: 'Éxito',
      message: 'La contraseña ha sido cambiada con éxito.',
      buttons: ['OK']
    });
    await successAlert.present();

    
    this.navigateToHome();
  }

  navigateToHome() {
    this.router.navigate(['/login']);
  }
}
