import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../service/auth-service/auth-service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  public title: string = 'Jereo';
  public color: string = 'red';
  public badgeColor : string = 'amber';

  public isConnected: boolean = false;
  public user : any = {};

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){

  }

  ngOnInit() {
    this.isConnected = this.auth.isConnected();
    if(!this.isConnected) this.router.navigate(['login']);
    this.user = this.auth.getUser();  
  }

  //-------------- displayUser in dashboard --------------//
  getInitial(pseudo){
  return pseudo.charAt(0).toUpperCase();
  }


  //-------------- logout --------------//
  deconnexion(){
    this.isConnected = this.auth.deconnexion();
    this.router.navigate(['login']);
  }

}
