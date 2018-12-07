import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service'
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { user } from '../../shared/models/user.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  public username: string;
  public email: string;
  public password: string;
  public passwordRepetida: string;
  public date: string;
  public birthdate: Date;
  public existUser: boolean;
  public differentPasswords: boolean;
  public myUser: user = { username: '', password: '', email: '', birthdate: undefined };


  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  onBlurUser() {
    this.authService.getEspecificUser(this.username).subscribe(
      res => {
        this.existUser = true;
      },
      error => {
        this.existUser = false;
      });
  }

  onBlurPassword() {
    this.differentPasswords = (this.password !== this.passwordRepetida);
  }

  inicializaUser() {
    this.myUser.username = this.username;
    this.myUser.email = this.email;
    this.myUser.password = this.password;
    if (this.date !== undefined) {
      let myDate = this.date.split("-");
      let year = parseInt(myDate[0]);
      let month = parseInt(myDate[1]) - 1;
      let day = parseInt(myDate[2]);
      this.birthdate = new Date(year, month, day);
      this.myUser.birthdate = this.birthdate.getTime();
    }

  }

  onSubmitRegistro() {
    if (!this.existUser && !this.differentPasswords && this.username !== undefined
      && this.password !== undefined && this.email !== undefined) {
      this.inicializaUser();
      this.authService.register(this.myUser).subscribe(
        res => {
          this.flashMessage.show('El usuario fue creado correctamente',
            { cssClass: 'alert-success', timeout: 3500 });
          this.authService.logout();
        },
        error => {
          switch (error.status) {
            case 400: {
              this.flashMessage
                .show(`No username o password.`,
                  { cssClass: 'alert-danger', timeout: 3500 });
              break;
            }
            case 409: {
              this.flashMessage
                .show(`Usuario ya existe`,
                  { cssClass: 'alert-danger', timeout: 3500 });
              break;
            }
            default: {
              this.flashMessage
                .show(`Uups! Algo ha ido mal. Vuelva a intentarlo más tarde.`,
                  { cssClass: 'alert-danger', timeout: 3500 }); 
              break;
            }
          }
          this.username = '';
          this.email = '';
          this.password = '';
          this.passwordRepetida = '';
          this.date = '';
        });
    }
  }

}
