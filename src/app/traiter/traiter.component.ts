import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ImageServiceProvider } from '../service/image-service/image-service';
import { ValidationServiceProvider } from '../service/validation-service/validation-service';



@Component({
  selector: 'app-traiter',
  templateUrl: './traiter.component.html',
  styleUrls: ['./traiter.component.css']
})
export class TraiterComponent implements OnInit {
  private InValidation : boolean = true;
  private data: any = {};
  private titre: string = "Validation final";
  private bureau: any;
  constructor(private validationProvider: ValidationServiceProvider, public route: ActivatedRoute, public router: Router, public imageProvider: ImageServiceProvider) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.validationProvider.getResultatsByBureau(res.idBureau)
                             .then(data => this.data = data) ;
    });
  }

  enregistrer(id: string){
    this.validationProvider.validateResults(id)
                           .then((res) => this.router.navigate(['validation']));
  }

  refuser(){
    
  }


}
