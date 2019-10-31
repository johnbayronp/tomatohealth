import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth,
              private routes: Router) { }

  // Registro
  registerUser(email: string, pass: string) {
    return new Promise ((resolve, reject) => {
      this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
            err => reject(err));
    });
  }

  loginUser() {}

  // Login desde email y password
  loginEmailUser(email: string, pass: string) {
    return  new Promise((resolve, reject) => {
      this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
      .then(userData => resolve(userData),
      err => reject(err));
    });
  }


  // Metodo Login  por Facebook
  loginFacebookUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());
  }

  // Metodo Login  por Google
  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  // Metodo Cerrar Sesion
  logoutUser() {
    return this.afsAuth.auth.signOut();
  }

  // Verificacion de sesion
  isAuth() {
    const user = this.afsAuth.auth.currentUser;
    if (user) {
      return true;
    } else {
      return false;
    }
  }

  // Display name Usuario conectado
  currentUserName() {
    return this.afsAuth.auth.currentUser['displayName'];
  }

  // Display name Usuario conectado
  currentUserEmail() {
    return this.afsAuth.auth.currentUser['email'];
  }

  // Display name Usuario conectado
  currentUserPhoto() {
    return this.afsAuth.auth.currentUser['photoURL'];
  }


}
