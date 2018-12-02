import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth/auth.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isLogin: boolean;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.emitSessionToken();
    this.authService.userLogged.subscribe( auth =>{
      this.isLogin = auth;
    });
  }

  onLogout(){
    this.authService.logout();
  }

}
