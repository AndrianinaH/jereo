import { Component } from '@angular/core';
import { RouterModule, Routes,Router } from '@angular/router';
import { AuthService } from './service/auth.service';
import { Location } from '@angular/common';
// // "start": "ng serve",
// "start": "node app.js"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title: string = 'Jereo';
  private color: string = 'red';
  private badgeColor : string = 'amber';
  private isConnected : boolean = false;

  constructor(
    public auth: AuthService,
    public router: Router,
    public location: Location
  ) {}

  ngOnInit():void{
    this.isConnected = this.auth.isConnected();
  }

  deconnexion(){
    this.auth.deconnexion();
    this.location.back();
  }
}

