import { inject, Injectable } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';
import { Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
 loadingCtrl= inject(LoadingController);
 toastCtrl=inject(ToastController)
 router=inject(Router);

 loading(){
  return this.loadingCtrl.create({
    spinner: 'crescent'
  });
 }


 //toast

 async presentToast(opts?:ToastOptions){
  const Toast= await this.toastCtrl.create(opts);
  Toast.present();
 }

 routerLink(url: string) { 
    return this.router.navigate([url]);
  }

  //guarar elemtos en local storage
  saveInLocalStorage(key:string, value:any){
    return localStorage.setItem(key, JSON.stringify(value));
  }

  //obtiene elemento del local storage
  getFromLocalStorage(key:string){
    return JSON.parse(localStorage.getItem(key))
  }

  
}
