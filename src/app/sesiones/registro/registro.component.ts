import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { NgIfContext } from '@angular/common';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  // Creamos nuestro objeto formulario
  registroForm: FormGroup;
  // Objeto que guardara la informacion de cada usuario
  userdata: any;

  reg = '/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){6,13}$/';

  erroresForm = {
    nombre: '',
    email: '',
    password: '',
    apellidos: ''
  };

   mensajesValidacion = {
    nombre : {
      required: 'Nombre es obligatorio',
      minlength: 'El Nombre debe tener como minimo 6 caracteres'
    },
    email: {
      required: 'Email obligatorio',
      email: 'Introduzca un email valido ex: micorreo@gmail.com'
    },
    password: {
      required: 'Contraseña obligatoria',
      pattern: 'La contraseña debe tener minimo un numero , una letra y un caracter'
    },
    apellidos: {
      required: 'Apellidos obligatoria',
      minlength: 'El Nombre debe tener como minimo 6 caracteres'
    }
  };



  constructor(public afAuth: AngularFireAuth,
              private router: Router,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private activatedRouter: ActivatedRoute) { }

  ngOnInit() {

      this.registroForm = this.formBuilder.group({
        nombre : ['', Validators.required, Validators.minLength(3)],
        apellidos : ['', Validators.required, Validators.minLength(6)],
        email : [ '', Validators.required, Validators.email],
        password : ['',
          Validators.required
        ]
      });

      this.registroForm.valueChanges.subscribe(data => this.onValueChanged(data));
      this.onValueChanged();
      console.log(this.registroForm.valid);
  }

  onValueChanged(data?: any) {

    if (!this.registroForm) { return; }
    const form =  this.registroForm;

    for (const field in this.erroresForm) {
        if (this.erroresForm.hasOwnProperty(field)) {
          this.erroresForm[field] = '';
          const control = form.get(field);

          if (control && control.dirty && !control.valid) {
            const message = this.mensajesValidacion[field];
            for (const key in control.errors) {
              if (control.errors.hasOwnProperty(key)) {
                this.erroresForm[field] += message[key] + '';
              }
            }
          }
        }
    }
  }

  onLoginRedirect(): void {
    this.router.navigate(['/test']);
  }

  onAddUser() {
    this.userdata = this.saveUserdata();
    this.authService.registerUser(this.userdata.email, this.userdata.password)
    .then((res) =>  {
      this.onLoginRedirect();
    }).catch(err => console.log('err: ', err.message));
  }

  saveUserdata() {
    const saveUserValidator = {
      email: this.registroForm.get('email').value,
      password: this.registroForm.get('password').value,
      nombre: this.registroForm.get('nombre').value,
      apellidos: this.registroForm.get('nombre').value
    };
    return saveUserValidator;
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
