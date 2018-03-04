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
  public badgeColor : string ='';

  public isConnected: boolean = false;
  public user : any = {};

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ){
  }

  ngOnInit() {
    this.badgeColor = this.getColor();
    this.isConnected = this.auth.isConnected();
    if(!this.isConnected) this.router.navigate(['login']);
    this.user = this.auth.getUser();  
  }

  //-------------- displayUser in dashboard --------------//
  getInitial(pseudo){
  return pseudo.charAt(0).toUpperCase();
  }

  getColor(){
    var num=Math.floor((Math.random() * 10) + 1);
    switch(num) {
      case 1:
        return "blue";
      case 2:
        return "amber";
      case 3:
        return "grey";
      case 4:
        return "green";
      case 5:
        return "cyan"; 
      case 6:
        return "indigo";  
      case 7:
        return "purple";  
      case 8:
        return "brown"; 
      case 9:
        return "orange"; 
      case 10:
        return "red darken-4";   
    }
}

  //-------------- logout --------------//
  deconnexion(){
    this.isConnected = this.auth.deconnexion();
    this.router.navigate(['login']);
  }

}
