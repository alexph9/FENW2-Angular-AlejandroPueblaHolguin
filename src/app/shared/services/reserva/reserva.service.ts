import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Reserva } from '../../models/reserva.model';


@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private baseurl: string = "http://fenw.etsisi.upm.es:5555";
  private RESERVATIONS: string = "/reservations";

  constructor(private http: HttpClient) { }

  getPistas(date: number){
    const promise = new Promise((resolve, reject) => {
      resolve(this.http.get<Reserva>(
        `${this.baseurl}${this.RESERVATIONS}/${date}`, {
          observe: 'response',
          headers: new HttpHeaders({'Authorization': sessionStorage.getItem('Authorization')})
        }).toPromise());
    });
    return promise;
  };
}
