import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../service/auth-service/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private title: string = 'Jereo';
  private color: string = 'red';
  private bgColor: string = 'amber lighten-5';

  constructor(
    public auth: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ){

  }

  ngOnInit(){}

  login(){
    if(this.auth.login()){
      this.router.navigate(['dashboard']);
    }
  }

}
