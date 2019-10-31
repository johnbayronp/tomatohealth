import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
/*Importamos los servicios Auth */

import { AuthService } from '../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  messageLogout: any = '¿Desea Cerrar sesion?';
  status: boolean;

  constructor(private authService: AuthService,
              private afAuth: AngularFireAuth,
              private routes: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.status = this.isUserAuth();
    console.log(this.status);
  }

  /* Evaluamos si estamos logados o no para mostrar componentes */
  isUserAuth() {
    return this.authService.isAuth();
  }

  onLogout() {
    const question = confirm(this.messageLogout);
    if (question) {
      this.authService.logoutUser()
      .then((res) => {
          this.routes.navigate(['/Inicio']);
      }).catch(err => console.log('err', err));
    } else {
    }
  }

}
