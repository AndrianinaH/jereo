import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../service/auth-service/auth-service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  public title: string = 'Jereo';
  public color: string = 'red';
  public bgColor: string = 'amber lighten-5';
  public newUser :any = {"pseudo":"","email":"", "password":"","confirmPassword":""};
  public error : string = "";
  public signinForm : FormGroup;

  constructor(
    public auth: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    public formBuilder: FormBuilder
  ){
    this.signinForm = this.formBuilder.group({
      pseudo: ['',Validators.required],
      email: ['',[Validators.email,Validators.required]],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required]
    });
  }

  ngOnInit() {
  }

  signin(){
    if(this.newUser.password == this.newUser.confirmPassword){
      let data = 'pseudo='+this.newUser.pseudo+'&email='+this.newUser.email+'&password='+this.newUser.password;
      this.auth.signin(data).then((result : any) => {
        if(result.status == "ko"){
          this.error = "Inscription échouer";
        }
        else if(result.status == "exist"){
          this.error = "Cette adresse email existe déjà, veillez saisir une autre adresse email";
        }
        else{
          this.router.navigate(['login']);
        }
      }).catch((err)=>{
        console.log(err);
      })
    
    }else{
      this.error = "le champs Mot de passe et le champs Confirmer mot de passe sont différents";
    }
   
  }

}
