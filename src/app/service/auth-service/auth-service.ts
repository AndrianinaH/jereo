import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { Observer } from 'rxjs/Observer';
// import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
  // private userStatut = new BehaviorSubject<boolean>(this.isConnected());
  // userConnected = this.userStatut.asObservable(); 

  constructor() { }

  // changeUserConnected(statut :boolean){
  //   this.userStatut.next(statut);
  // }

  login():boolean{
    let user = {
      "id":1,
      "pseudo":"Layton",
      "email":"layton2@gmail.com"
    }
    localStorage.setItem("jereo_user", JSON.stringify(user));
    return true;
  }

  isConnected() : boolean{
    if(localStorage.getItem("jereo_user") != null && localStorage.getItem("jereo_user").length !=0){
      return true;
    }
    return false;
  }

  deconnexion(): boolean{
    localStorage.clear();
    return false;
  }

  getUser(){
    return JSON.parse(localStorage.getItem("jereo_user"));
  }

}
