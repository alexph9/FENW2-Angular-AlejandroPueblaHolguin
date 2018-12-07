import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../../shared/services/reserva/reserva.service'
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Reserva } from '../../shared/models/reserva.model';
import { AuthService } from '../../shared/services/auth/auth.service'

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
  public freeHours: Reserva[] = [];
  public especificDay: string;
  public token: string;
  public actualCourtId: string;
  public actualRsvTime: string;
  public month: number;
  public year: number;
  public day: number;

  constructor(
    public reservaService: ReservaService,
    public router: Router,
    public flashMessage: FlashMessagesService,
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.hasDaySelected = false;
  }

  onSubmitGetPistas() {
    if (this.date !== undefined) {
      let myDate = this.date.split("-");
      this.year = parseInt(myDate[0]);
      this.month = parseInt(myDate[1]) - 1;
      this.day = parseInt(myDate[2]);
      const TWENTY_HOURS_IN_MS = 72000000;
      this.reservaDate = new Date(this.year, this.month, this.day);
      this.especificDay = `${this.day}/${this.month + 1}/${this.year}`
      if (this.reservaDate.getTime() < Date.now() - TWENTY_HOURS_IN_MS ) {
        this.flashMessage.show(`No puedes reservar para el ${this.especificDay}.\n Se trata de una fecha pasada.`,
          { cssClass: 'alert-danger', timeout: 3500 });
      } else {
        this.reservaService.getPistas(this.reservaDate.getTime()).subscribe(
          (res: any) => {
            this.hasDaySelected = true;
            this.reservations = res.body;
            this.initializeFreeHours(this.reservations, this.especificDay);
            this.token = res.headers.get('Authorization');
            this.authService.saveToken(this.token);
          },
          error => {
            switch (error.status) {
              case 401: {
                this.flashMessage
                  .show(`Sesión expirada.`,
                    { cssClass: 'alert-danger', timeout: 3500 });
                this.authService.logout();
                break;
              }
              default: {
                this.flashMessage
                  .show(`Uups! Algo ha ido mal. Vuelva a intentarlo más tarde.`,
                    { cssClass: 'alert-danger', timeout: 3500 });
                break;
              }
            }
          }
        );
      }

    } else {
      this.flashMessage.show('Elija una fecha',
        { cssClass: 'alert-danger', timeout: 3500 });
    }
  }

  back() {
    this.hasDaySelected = false;
    this.date = undefined;
  }

  reservar() {
    if (this.actualCourtId !== undefined && this.actualRsvTime !== undefined) {
      let courtId = parseInt(this.actualCourtId);
      let reservationHour = this.actualRsvTime.split(":");
      let hour = parseInt(reservationHour[0]);
      let rsvdateTime = new Date(this.year, this.month, this.day, hour, 0, 0)
      let reservation = {
        'courtid': courtId,
        'rsvdatetime': rsvdateTime.getTime()
      }
      this.reservaService.saveReservation(reservation).subscribe(
        res => {
          this.flashMessage
            .show(`Reserva para la pista ${this.actualCourtId} el día ${this.especificDay} a las ${this.actualRsvTime} realizada.`,
              { cssClass: 'alert-success', timeout: 4000 });
          this.router.navigate(['/']);
        },
        err => {
          switch (err.status) {
            case 400: {
              this.flashMessage
                .show(`La pista o el día no son validos.`,
                  { cssClass: 'alert-danger', timeout: 3500 });
              this.back();
              break;
            }
            case 401: {
              this.flashMessage
                .show(`Sesión expirada.`,
                  { cssClass: 'alert-danger', timeout: 3500 });
              this.authService.logout();
              break;
            }
            case 409: {
              this.flashMessage
                .show(`Ya ha realizado reserva un máximo de 4 veces.`,
                  { cssClass: 'alert-danger', timeout: 3500 });
              this.router.navigate(['/']);
              break;
            }
            default: {
              this.flashMessage
                .show(`Uups! Algo ha ido mal. Vuelva a intentarlo más tarde.`,
                  { cssClass: 'alert-danger', timeout: 3500 });
              this.back();
              break;
            }
          }
        });
    } else {
      this.flashMessage.show(`Elija una pista y una hora para reservar`,
        { cssClass: 'alert-danger', timeout: 3500 });
    }

  }

  onSelected(courtid: string, rsvTime: string) {
    this.actualCourtId = courtid;
    this.actualRsvTime = rsvTime;
  }

  initializeFreeHours(reservations: Reserva[], day: string) {
    const FIRST_HOUR: number = 10;
    const LAST_HOUR: number = 21;
    const COURT_TOTAL: number = 4;
    for (let i = FIRST_HOUR; i < LAST_HOUR; i++) {
      for (let j = 0; j < COURT_TOTAL + 1; j++) {
        let time = `${i}:00`
        let found = reservations.find(reserva => {
          return (reserva.courtId === j && reserva.rsvtime === time);
        });
        if (found === undefined) {
          this.freeHours.push({
            courtId: j,
            rsvId: undefined,
            rsvdateTime: undefined,
            rsvday: day,
            rsvtime: time,
          });
        }
      }
    }
  }
}
