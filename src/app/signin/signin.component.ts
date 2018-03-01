import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../service/auth-service/auth-service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  private title: string = 'Jereo';
  private color: string = 'red';
  private bgColor: string = 'amber lighten-5';

  constructor(
    public auth: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ){

  }

  ngOnInit() {
  }

  signin(){
    this.router.navigate(['login']);
  }

}
