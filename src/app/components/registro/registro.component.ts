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
  public myUser: user = {username: '', password: '', email: '', birthdate: undefined};


  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }

  onBlurUser(){
    console.log(this.username);
    this.authService.getEspecificUser(this.username).then(res => {
      this.existUser = true;
      console.log(true);
    })
    .catch(error => {
      console.log(false);
      this.existUser = false;
    });
  }

  onBlurPassword(){
    this.differentPasswords = (this.password !== this.passwordRepetida);
  }

  inicializaUser(){
    this.myUser.username = this.username;
    this.myUser.email = this.email;
    this.myUser.password = this.password;
    if(this.date !== undefined){
      let myDate = this.date.split("-");
      this.birthdate = new Date(Number(myDate[0]), Number(myDate[0])-1, Number(myDate[0])); // Año, mes, día
      this.myUser.birthdate = this.birthdate.getTime();
    }

  }

  onSubmitRegistro(){
    console.log(this.username)
    if(!this.existUser && !this.differentPasswords && this.username !== undefined
      && this.password !== undefined && this.email !== undefined){
      this.inicializaUser();
      this.authService.register(this.myUser)
      .then(res => {
        this.flashMessage.show('El usuario fue creado correctamente',
          { cssClass: 'alert-success', timeout: 3500 });
        this.router.navigate(['/login']);
      })
      .catch(error => {
        this.flashMessage.show('Ha habido un problema, vuelva a intentarlo',
          { cssClass: 'alert-success', timeout: 3500 });
        this.username = '';
        this.email = '';
        this.password = '';
        this.passwordRepetida = '';
        this.date = '';
      });
    }
  }
  
}
