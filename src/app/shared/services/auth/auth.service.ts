import { Injectable, OnInit, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../../models/user.model';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private baseurl: string = "http://fenw.etsisi.upm.es:5555";
  private USERS: string = "/users";
  private token: string;
  private hasUserLogged: boolean = false;
  @Output() userLogged: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, public router: Router) { }

  isValidUser(username: string, password: string){
    return (username !== '' && password !== '');
  }

  isUserLogged(){
    return this.hasUserLogged;
  }

  emitSessionToken(){ 
    this.token = sessionStorage.getItem("Authorization");
    this.userLogged.emit(this.token !== null)
  }

  login(username: string, password: string){
    const promise = new Promise((resolve, reject) => {
      resolve(this.http.get<any>(
        `${this.baseurl}${this.USERS}/login?username=${username}&password=${password}`,
        {observe: 'response'}).toPromise());
    });
    return promise;
  }

  saveToken(accessToken: string){
    sessionStorage.setItem("Authorization", accessToken);
    this.hasUserLogged = true;
    this.emitSessionToken();
  }

  logout(){
    sessionStorage.clear();
    this.hasUserLogged = false;
    this.emitSessionToken();
    this.router.navigate(['/login']);
  }

  getEspecificUser(username: string){
    const promise = new Promise((resolve, reject) => {
      resolve(this.http.get(
        `${this.baseurl}${this.USERS}/${username}`,
        {observe: 'response'}).toPromise());
    });
    return promise;
  }

  register(person: user){
    const promise = new Promise((resolve, reject) => {
      resolve(
        this.http.post(`${this.baseurl}${this.USERS}`, person).toPromise());
    });
    return promise;
  }

}
