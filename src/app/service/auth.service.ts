import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor() { }

  login():boolean{
    let user = {
      "id":1,
      "username":"Layton",
      "useremail":"layton2@gmail.com"
    }
    localStorage.setItem("jereo_user", JSON.stringify(user));
    return true;
  }

  isConnected(){
    if(localStorage.getItem("jereo_user") != null && localStorage.getItem("jereo_user").length !=0){
      return true;
    }
    return false;
  }

  deconnexion(){
    localStorage.clear();
  }

}
