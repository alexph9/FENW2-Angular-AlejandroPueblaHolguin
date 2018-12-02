import { Injectable, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseurl: string = "http://fenw.etsisi.upm.es:5555";
  private loginEndpoint: string = "/users/login";
  private token: string;
  private isUserLogged: boolean;
  @Output() userLogged: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) { }

  isValidUser(username: string, password: string){
    return (username !== '' && password !== '');
  }

  emitSessionToken(){ 
    this.token = sessionStorage.getItem("Authorization");
    this.userLogged.emit(this.token !== null)
  }

  login(username: string, password: string){
    const promise = new Promise((resolve, reject) => {
      resolve(this.http.get<any>(
        `${this.baseurl}${this.loginEndpoint}?username=${username}&password=${password}`,
        {observe: 'response'}).toPromise());
    });
    return promise;
  }

  saveToken(accessToken: string){
    sessionStorage.setItem("Authorization", accessToken);
    this.emitSessionToken();
  }

  logout(){
    sessionStorage.clear();
    this.emitSessionToken();
  }

}
