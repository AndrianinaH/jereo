import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { UrlServiceProvider } from '../../urlService/url-service';
// import { Observable } from 'rxjs/Observable';
// import { Observer } from 'rxjs/Observer';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  // private userStatut = new BehaviorSubject<boolean>(this.isConnected());
  // userConnected = this.userStatut.asObservable(); 
  // changeUserConnected(statut :boolean){
  //   this.userStatut.next(statut);
  // }

  public headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'});
  constructor(
    public http: HttpClient,
    public urlProvider: UrlServiceProvider
  ) { }

  login(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.urlProvider.login(), data, { headers: this.headers }).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  signin(data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.urlProvider.signin(), data, { headers: this.headers }).subscribe(res => {
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  }

  isConnected(): boolean {
    if (localStorage.getItem("jereo_user") != null && localStorage.getItem("jereo_user").length != 0) {
      return true;
    }
    return false;
  }

  deconnexion(): boolean {
    console.log(JSON.parse(localStorage.getItem("jereo_user")));
    localStorage.clear();
    return false;
  }

  getUser() {
    return JSON.parse(localStorage.getItem("jereo_user"));
  }

}
