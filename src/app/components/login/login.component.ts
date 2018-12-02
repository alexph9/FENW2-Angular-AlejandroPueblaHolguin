import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth/auth.service'
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
    public router: Router
    ) { }

  ngOnInit() {
  }

  onSubmitLogin(){
    if(this.authService.isValidUser(this.user, this.password)){
      this.authService.login(this.user, this.password)
      .then(res => {
        this.token = res;
        this.authService.saveToken(this.token);
        this.router.navigate(['/reservar']);
      })
      .catch(error => {
        this.invalidUser = true;
      });
    }
  }
}
