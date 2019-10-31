import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GraficotestService {

  constructor(private http: HttpClient) { }

  urlAPI: any;

  temperaturasAPI() {
    this.urlAPI = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=b963ef9b75f026a8c430d1abbd5b28c6';
    return this.http.get(this.urlAPI)
    .pipe(
      map(res => res)
    );
  }

}
