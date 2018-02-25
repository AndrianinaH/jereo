import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DistrictServiceProvider } from '../service/district-service/district-service';

@Component({
  selector: 'app-commune',
  templateUrl: './district.component.html',
  styleUrls: ['./district.component.css']
})
export class DistrictComponent implements OnInit {
  private InValidation : boolean = false;
  private image;
  private titre: string = "District";
  private data: any = {};
  private nombreElecteur: number = 8254;
  private district: string;
  private nomDistrict: string;
  private total: number = 0;
  private percent: number = 0;
  private abstinance: number = 0;

  constructor(private districtService: DistrictServiceProvider, public route: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.nomDistrict = res.nomDistrict;
      this.districtService.getDistrictData(this.nomDistrict)
                          .then(data => {
                            this.data = data;
                            this.total = this.getTotal();
                            this.percent = this.getPourcentage2(this.total);
                            this.abstinance = 100 - this.percent;
                          });
    });
  }

 
  getTotal(){
    let total = 0;
    this.data.candidatList.forEach(element => {
      total += element.nombre
    });
    return total;
  }


  getPourcentage(nbr : number){
    let pourcentage = (nbr*100)/this.getTotal();
    return pourcentage;
  }
  getPourcentage2(nbr : number){
    let pourcentage = (nbr*100)/(this.getTotal()+640);
    return pourcentage;
  }


  getCommunesData(districtName: string): void {

  }
}