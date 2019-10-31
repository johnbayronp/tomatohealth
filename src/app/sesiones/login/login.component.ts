import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import {Router, ActivatedRoute} from '@angular/router';
import { DataComponent } from '../../test/data/data.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string;
  public password: string;
  public notRegister: boolean;

  messageNotRegister = 'El usuario no esta registrado, o su correo y contraseña son invalidos';

  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) { }


  ngOnInit() {
    this.notRegister = false;
  }

  onLoginRedirect(): void {
    this.router.navigate(['/test']);
  }

  onLogin(): void {
    this.authService.loginEmailUser(this.email, this.password)
    .then((res)  => { // devuelve(then) una promesa((res))
      this.onLoginRedirect();
    }).catch(err => {console.log('err: ', err.message); this.notRegister = true; });
  }

  onLoginGoogle(): void {
    this.authService.loginGoogleUser()
    .then((res) => {
      /*console.log('resUser:', res);*/
      this.onLoginRedirect();
    }).catch( err => console.log('err', err.message));
  }

  onLoginFacebook(): void {
    this.authService.loginFacebookUser()
    .then((res) => {
      this.onLoginRedirect();
    }).catch(err => console.log('err', err.message));
  }

}
