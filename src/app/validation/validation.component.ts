import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ImageServiceProvider } from '../service/image-service/image-service';
import { ValidationServiceProvider } from '../service/validation-service/validation-service';
ValidationServiceProvider

@Component({
  selector: 'app-validation',
  templateUrl: './validation.component.html',
  styleUrls: ['./validation.component.css']
})
export class ValidationComponent implements OnInit {

  private serverUrl = 'http://192.168.8.119:8080/socket'
  private data: any;

  private InValidation : boolean = true;
  private titre: string = "Validation des resultats";
  private defaultImage;
  constructor(private validationProvider: ValidationServiceProvider, public route: ActivatedRoute, public router: Router, public imageProvider: ImageServiceProvider) { 
  }

  ngOnInit() {
    this.validationProvider.getResultatsNonValides()
                           .then(data => {
                             this.data = data;
                             console.log(data);
                            });
  }

  traiter(idBureau:any){
    this.router.navigate(['traiter', idBureau]);
  }


}
