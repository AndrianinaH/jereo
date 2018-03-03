import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../service/auth-service/auth-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public title: string = 'Jereo';
  public color: string = 'red';
  public bgColor: string = 'amber lighten-5';
  public newUser :any = {"email":"", "password":""};
  public error : string = "";
  public loginForm : FormGroup;

  constructor(
    public auth: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder
  ){
    this.loginForm = this.formBuilder.group({
      email: ['',[Validators.email,Validators.required]],
      password: ['',Validators.required]
    });
  }

  ngOnInit(){}

  login(){
    let data = 'email='+this.newUser.email+'&password='+this.newUser.password;
    this.auth.login(data).then((result : any) => {
      if(result.status == "ko"){
        this.error = "Authentification échouer";
      }
      else{
        localStorage.setItem("jereo_user", JSON.stringify(result));
        this.router.navigate(['dashboard']);
      }
    }).catch((err)=>{
      console.log(err);
    })
  }

}
