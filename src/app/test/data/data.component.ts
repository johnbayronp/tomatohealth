import { Component, OnInit, Input } from '@angular/core';
/*Importamos el servicio*/
import { GraficotestService } from '../../servicios/graficotest.service';
import { Chart } from 'chart.js';
import { AuthService } from '../../servicios/auth.service';
import { LoginComponent } from '../../sesiones/login/login.component';
import { DataTomateService } from '../../servicios/data-tomate.service';
import { map, timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {


  /*Declaramos la propiedad*/
  data: any = [];
  dataTomate: any = [];
  ciudad: any;
  nameUser: string;
  emailUser: string;
  photoUser: string;

  /** propiedades a utilizar en frontend */
  promHumedad: any;
  promTemperatura: any;

  /* Datos de informacion */
  tempMaxima: boolean;
  tempMinima: boolean;

  humMaxima: boolean;
  humMinima: boolean;

  constructor(private graficosService: GraficotestService,
              private authService: AuthService,
              private dataSensorApi: DataTomateService) { }


  ngOnInit() {
    this.nameUser = this.authService.currentUserName();
    this.emailUser = this.authService.currentUserEmail();
    this.photoUser = this.authService.currentUserPhoto();

    // GRAFICA DE TOMATE
    this.dataTomate = this.dataSensorApi.getAllsData().subscribe(sensor => {

      // console.log(sensor);
      const humedades = sensor.map(res => res.humedad);
      const temperatura = sensor.map(res => res.temperatura);
      const fechas = sensor.map(res => {
        return res.fecha + ' ' + res.hora;
      });


      // ------------------------ Calcular promedio Humedad ------------------------
      let porcH;
      porcH = 0;
      const sumH = humedades.forEach(el => {
        porcH = Number(el) + porcH; // 50 + 0
      });
      const ph = Number(porcH) / humedades.length ;
      // console.log(ph);

      // --------------------- Calcular promedio temperatura --------------------------
      let promT;
      promT = 0;
      const sumT = temperatura.forEach(el => {
        promT = Number(el) + promT; // 50 + 0
      });
      const pt = Number(promT) / temperatura.length  ;
      // console.log(pt);


      // ----------------- Resultado de promedio solo 2 decimas ---------------------------
      const lastHumedad = ph.toFixed(2);
      const lastTemperatura = pt.toFixed(2);

      // ------------- Verificamos el estado de la temperatura Alta o baja ----------------------
      this.statusTemperatura(lastTemperatura);

      // ---------- Tomamos los datos para verlos en el html -------------------
      this.promHumedad = lastHumedad;
      this.promTemperatura = lastTemperatura;


      // ---------------- Insertamos en un array nuestro dos ultimos valores --------------------
      // const lastHumedad = humedades[humedades.length - 1]; //TOMA ULTIMO DATO DE HUMEDAD
      const lastDta = [];
      lastDta.push(lastHumedad, lastTemperatura);

      // ----------------------- GRAFICO PIE CHARTJS -------------------------------------------
      this.dataTomate = new Chart('pie_th', {
        type: 'pie',
        data: {
          labels: [
            'Humedad',
            'Temperatura'
          ],
          datasets: [
            {
              data: lastDta,
              backgroundColor: [
                '#149c89',
                '#dc220f'
              ],
              hoverBackgroundColor: [
                '#13f9d9',
                'red'
              ]
            }
          ]
        },
        options: {
          legend: {
            labels: {
              fontColor: 'white',
              fontSize: 14
            }
          },
          animation: {
            animateRotate: true
          }
        }
      });

      // -------------------------- CHART LINEAL -------------------------------------
      this.dataTomate = new Chart('temp_hum', {
        type: 'line',
        data: {
          labels: fechas,
          datasets: [
            {
              label: 'Temperatura',
              data: temperatura,
              backgroundColor: [
                'red'
              ],
              fill: false
            },
            {
             label: 'Humedad',
             data: humedades,
             backgroundColor: [
               '#00ffff'
             ],
             fill: false
           }
          ]
        },
        options: {
          legend: {
            display: true,
            labels: {
              fontColor: 'black'
            },
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [
              {
               display: true
              }
            ]
          }
        }
      });
    });
  }

  // ---------------- METODOS POR FUERA DEL ngOnInit() ----------------------------
  statusTemperatura(temp) {
    if (temp >= 45) {
      this.tempMinima = false;
      this.tempMaxima = true;

      this.humMinima = true;
      this.humMaxima = false;
    } else if (temp <= 6 ) {
      this.tempMinima = true;
      this.tempMaxima = false;

      this.humMinima = false;
      this.humMaxima = true;
    } else {
      this.tempMaxima = false;
      this.tempMinima = false;

      this.humMinima = false;
      this.humMaxima = false;
    }
  }

}


/*
va_en_el_on_init(){
    // GRAFICA API CLIMA DE MOSCOW
    this.data = this.graficosService.temperaturasAPI()
    .subscribe(res => {
      this.ciudad = res['city'].name;

      const TEMP_MAX = res['list'].map(response => response.main.temp_max);
      const TEMP_MIN = res['list'].map(response => response.main.temp_min);
      const allDays = res['list'].map(response => response.dt);
      const climaDias = [];


      console.log(allDays);

      allDays.forEach(el => {
         const jsDate = new Date( el * 1000);
         const options = {
           weekday: 'long',
           month: 'short',
           day: 'numeric'
         };

         climaDias.push(jsDate.toLocaleTimeString('es', options));

         this.data = new Chart('canvas', {
           type: 'line',
           data: {
             labels: climaDias,
             datasets: [
               {
                 data: TEMP_MAX,
                 backgroundColor: [
                   'red',
                   'red',
                   'red',
                   'red',
                   'red',
                   'red'
                 ],
                 fill: false
               },
               {
                data: TEMP_MIN,
                backgroundColor: [
                  '#00ffff',
                  '#00ffff',
                  '#00ffff',
                  '#00ffff',
                  '#00ffff',
                  '#00ffff'
                ],
                fill: false
              }
             ]
           },
           options: {
             legend: {
               display: false
             },
             scales: {
               xAxes: [{
                  display: true
               }],
               yAxes: [
                 {
                  display: true
                 }
               ]
             }
           }
         });
      });
    });
}
*/
