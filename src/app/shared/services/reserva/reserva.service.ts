import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Reserva } from '../../models/reserva.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private baseurl: string = "http://fenw.etsisi.upm.es:5555";
  private RESERVATIONS: string = "/reservations";

  constructor(private http: HttpClient) { }

  getPistas(date: number) {
    return this.http.get(
      `${this.baseurl}${this.RESERVATIONS}/${date}`, {
        observe: 'response',
        headers: new HttpHeaders({ 'Authorization': sessionStorage.getItem('Authorization') })
      })
  };

  saveReservation(reservation: any) {
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", sessionStorage.getItem('Authorization'));
    return this.http.post(
          `${this.baseurl}${this.RESERVATIONS}`,
          reservation,
          { headers });
    }
}
