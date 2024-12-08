import { Component, inject, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    role: new FormControl('', [Validators.required]) 
  });
  
  firebaseSvc = inject(FirebaseService);
  utilsSvc = inject(UtilsService);

  ngOnInit() {}
  async submit() {
    if (this.form.valid) {
      const loading = await this.utilsSvc.loading(); 
      await loading.present();
  
      try {
        const role = this.form.value.role;  
        const uid = await this.registerUser(role);  
  
        if (role === 'profesor') {
          await this.setProfesorInfo(uid, 'profesores', loading); 
        } else {
          await this.setUserInfo(uid, 'users', loading); 
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        loading.dismiss(); 
      }
    }
  }
  
  // Método separado para el registro del usuario
  async registerUser(role: string): Promise<string> {
    const res = await this.firebaseSvc.signUp(this.form.value as User);
    await this.firebaseSvc.updateUser(this.form.value.name);
    const uid = res.user.uid;
    this.form.controls.uid.setValue(uid);
    return uid; 
  }
  
  async setUserInfo(uid: string, collection: string, loading: HTMLIonLoadingElement) {
    const path = `${collection}/${uid}`;
    const formData = { ...this.form.value };
    delete formData.password;
  
    try {
      await this.firebaseSvc.setDocument(path, formData);
      this.utilsSvc.saveInLocalStorage('user', formData);
      this.utilsSvc.routerLink('/main'); 
      this.form.reset();
    } catch (error) {
      console.error('Error al guardar en users:', error);
    }
  }
  
  async setProfesorInfo(uid: string, collection: string, loading: HTMLIonLoadingElement) {
    const path = `${collection}/${uid}`;
    const formData = { ...this.form.value };
    delete formData.password;
  
    try {
      await this.firebaseSvc.setDocument(path, formData);
      this.utilsSvc.saveInLocalStorage('user', formData);
      this.utilsSvc.routerLink('/main');
      this.form.reset();
    } catch (error) {
      console.error('Error al guardar en profesores:', error);
    }
  }
}