import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../shared/services/reserva/reserva.service'
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Reserva } from '../../shared/models/reserva.model';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {

  public date: string;
  public reservaDate: Date;
  public hasDaySelected: boolean;
  public reservations: Reserva[] = [];

  constructor(
    public reservaService: ReservaService,
    public router: Router,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this.hasDaySelected = false;
  }

  onSubmitGetPistas() {
    if (this.date !== undefined) {
      let myDate = this.date.split("-");
      let year = parseInt(myDate[0]);
      let month = parseInt(myDate[1]) - 1;
      let day = parseInt(myDate[2]);
      this.reservaDate = new Date(year, month, day);
      this.reservaService.getPistas(this.reservaDate.getTime())
        .then(res => {
          if (res.body.length === 0) {
            this.flashMessage.show(`No hay reservas disponibles para el ${day}/${month}/${year}`,
              { cssClass: 'alert-danger', timeout: 3500 });
          } else {
            this.hasDaySelected = true;
            this.reservations = res.body;
          }
        })
        .catch(error => {
          this.flashMessage.show('Usuario inválido',
            { cssClass: 'alert-danger', timeout: 3500 });
          this.router.navigate(['/login']);
        });
    } else {
      this.flashMessage.show('Elija una fecha',
        { cssClass: 'alert-danger', timeout: 3500 });
    }
  }

  return() {
    this.hasDaySelected = false;
    this.date = undefined;
  }

}
