import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'
import { ImageServiceProvider } from '../service/image-service/image-service';
import { RegionServiceProvider } from '../service/region-service/region-service';


declare let Materialize:any; 

@Component({
  selector: 'app-region',
  templateUrl: './region.component.html',
  styleUrls: ['./region.component.css']
})

export class RegionComponent implements OnInit {
  private InValidation : boolean = false;
  private data: any = {};
  private defaultImage = 'assets/images/mada.gif';
  private image ;
  private nomRegion;
  private titre : string = "Region";
  private total: number = 0;
  private percent: number = 0;
  private abstinance: number = 0;

  constructor(private regionService: RegionServiceProvider, public route: ActivatedRoute, public router : Router, public imageProvider: ImageServiceProvider) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.nomRegion = res.nomRegion;
      this.defaultImage = this.imageProvider.getRegionImgGF(this.nomRegion);
      this.image = this.defaultImage;
    });
  
    this.regionService.getRegionData(this.nomRegion)
                        .then(data => {
                          this.data = data;
                          this.total = this.getTotal();
                          this.percent = this.getPourcentage2(this.total);
                          this.abstinance = 100 - this.percent;
                        });
  }

  changeImage(e: any): void {
    this.image = this.imageProvider.getDistrictImg(e.target.title);
  }

  resetImage(e: any): void {
    this.image = this.defaultImage;
  }
  

  getTotal(){
    let total = 0;
    this.data.candidatList.forEach(element => {
      total += element.nombre
    });
    return total;
  }

  detailDistrict(e: any): void {
    this.router.navigate(['district', e.target.title]);
  }

  getPourcentage(nbr : number){
    let pourcentage = (nbr*100)/this.getTotal();
    return pourcentage;
  }
  getPourcentage2(nbr : number){
    let pourcentage = (nbr*100)/(this.getTotal()+3100);
    return pourcentage;
  }

 


}
