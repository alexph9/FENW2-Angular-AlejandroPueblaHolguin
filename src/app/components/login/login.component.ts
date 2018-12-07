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
      this.authService.login(this.user, this.password).subscribe(
        res => {
          this.token = res.headers.get('Authorization');
        this.authService.saveToken(this.token);
        this.flashMessage.show(`¡Bienvenido ${this.user}!`,
          { cssClass: 'alert-success', timeout: 3500 });
        this.router.navigate(['/reservar']);
        }, 
        error => {
          switch (error.status) {
            case 400: {
              this.flashMessage
                .show(`No username o password.`,
                  { cssClass: 'alert-danger', timeout: 3500 });
              break;
            }
            case 401: {
              this.flashMessage
                .show(`Usuario o password inválidos`,
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
        this.invalidUser = true;
        });
    }
  }
}
