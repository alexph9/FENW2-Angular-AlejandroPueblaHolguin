import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isLogin: boolean;

  constructor() { }

  ngOnInit() {
    //TODO: Llamar al servicio de auth propio
    this.isLogin = false;
  }

}
