import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private titre: string = "Dashboard";
  private color: string = 'red';
  private bgColor: string = 'amber lighten-5';

  constructor(
    public auth : AuthService,
    public route: ActivatedRoute, public router: Router
  ){

  }

  ngOnInit(){}

  login(){
    if(this.auth.login()){
      this.router.navigate(['dashboard']);
    }
  }

}
