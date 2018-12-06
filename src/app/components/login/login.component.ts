import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service'
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public invalidUser: boolean;
  public user: string;
  public password: string;
  private token: any;

  constructor(
    public authService: AuthService,
    public router: Router,
    public flashMessage: FlashMessagesService
    ) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    if(this.authService.isValidUser(this.user, this.password)){
      this.authService.login(this.user, this.password)
      .then(res => {
        this.token = res;
        this.authService.saveToken(this.token);
        this.flashMessage.show(`¡Bienvenido ${this.user}!`,
          { cssClass: 'alert-success', timeout: 3500 });
        this.router.navigate(['/reservar']);
      })
      .catch(error => {
        this.flashMessage.show(`Usuario no válido`,
          { cssClass: 'alert-success', timeout: 3500 });
        this.invalidUser = true;
      });
    }
  }
}
