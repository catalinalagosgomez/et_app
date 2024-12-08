import { Component, OnInit, inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);
  loading = false;
  router = inject(Router); 

  ngOnInit() {}

  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading();
      await loading.present();

      this.firebaseSvc.sendPasswordResetEmail(this.form.value.email)
        .then(async () => {
          await loading.dismiss();
          this.utilsSvc.presentToast({
            message: 'Correo enviado',
            duration: 2000,
          });
          setTimeout(() => {
            this.router.navigate(['/auth']);
          }, 1000);
        })
        .catch(async error => {
          await loading.dismiss();
          this.utilsSvc.presentToast({
            message: 'Error al enviar el correo: ' + error.message,
            duration: 1500,
          });
        });
    }
  }

}
