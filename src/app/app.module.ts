/* Modules*/
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';


/* Fire base DB Modulos*/
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireModule } from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

/*Component */
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { DataComponent } from './test/data/data.component';
import { InicioComponent } from './inicio/inicio.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './sesiones/login/login.component';
import { RegistroComponent } from './sesiones/registro/registro.component';

/*servicios*/
import {GraficotestService} from './servicios/graficotest.service';
import { AuthService } from './servicios/auth.service';
import { AccesoService } from './servicios/acceso.service';
import { DataTomateService } from './servicios/data-tomate.service';

/*Rutas */
const routes: Routes = [
  {path: '', component: InicioComponent},
  {path: 'test', component: DataComponent,
    canActivate: [AccesoService]},
  {path: 'login', component: LoginComponent},
  {path: 'registro', component: RegistroComponent},
  {path: '**', component: InicioComponent},
  {path: 'inicio', component: InicioComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    DataComponent,
    InicioComponent,
    HeaderComponent,
    LoginComponent,
    RegistroComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
  ],

  providers: [
    GraficotestService,
    AuthService,
    AngularFireAuth,
    AccesoService,
    DataTomateService,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
