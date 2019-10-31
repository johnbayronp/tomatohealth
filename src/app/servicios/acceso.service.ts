import { Injectable } from '@angular/core';
/*Servicios para proteger las rutas */
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AccesoService implements CanActivate {

  constructor(private authService: AuthService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authService.isAuth();
  }

}
