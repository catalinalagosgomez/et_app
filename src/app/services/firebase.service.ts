import { AngularFireAuth } from '@angular/fire/compat/auth';
import { inject, Injectable } from '@angular/core';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile, sendPasswordResetEmail} from 'firebase/auth';
import { User } from '../models/user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore, setDoc, doc } from '@angular/fire/firestore';
import { collection, getDocs } from '@angular/fire/firestore';
//import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Asignatura } from '../models/asignatura.model';


@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore);

  // Autenticación
  async getUserRole(uid: string): Promise<string | null> {
    const userDoc = await this.firestore.collection('profesores').doc(uid).get().toPromise();
    
    // Verificar si userDoc es undefined o null antes de acceder a sus propiedades
    if (userDoc && userDoc.exists) {
      const userData = userDoc.data() as User;
      return userData.role || null;
    }
    
    return null;
  }
  

  async login(email: string, password: string) {
    const result = await this.auth.signInWithEmailAndPassword(email, password);
    return result;
  }

  // Crear usuario alumno
  signUp(user: User) {
    return createUserWithEmailAndPassword(getAuth(), user.email, user.password);
  }

  // Actualizar usuario
  updateUser(displayName: string) {
    return updateProfile(getAuth().currentUser!, { displayName });
  }

  // Base de datos
  // Setear un documento en la base de datos
  setDocument(path: string, data: any) {
    return setDoc(doc(getFirestore(), path), data);
  }

  // Email para reestablecer contraseña
  sendPasswordResetEmail(email: string) {
    return sendPasswordResetEmail(getAuth(), email);
  }

  // Obtener el nombre de usuario de "profesores"
  async getUserName(uid: string): Promise<string | null> {
    try {
      const userDoc = await this.firestore.collection('profesores').doc(uid).get().toPromise();
      if (userDoc.exists) {
        const userData = userDoc.data() as { name: string };
        return userData.name || null;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener el nombre del profesor:', error);
      return null;
    }
  }
  
  addAsignatura(asignatura: any) {
    return this.firestore.collection('asignaturas').add(asignatura);
  }
 
  // Obtener el nombre de usuario de "users"
  async getUserNameUsers(uid: string): Promise<string | null> {
    try {
      const userDoc = await this.firestore.collection('users').doc(uid).get().toPromise();
      if (userDoc.exists) {
        const userData = userDoc.data() as { name: string };
        return userData.name || null;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener el nombre del usuario:', error);
      return null;
    }
  } }