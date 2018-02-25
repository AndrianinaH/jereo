import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { ImageServiceProvider } from '../service/image-service/image-service';
import { ProvinceServiceProvider } from '../service/province-service/province-service';


@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.css']
})
export class ProvinceComponent implements OnInit {
  private InValidation : boolean = false;
  private data: any = {};
  private defaultImage;
  private image;
  private nomProvince;
  private titre: string = "Province";
  private total: number = 0;
  private percent: number = 0;
  private abstinance: number = 0;

  constructor(private provinceService: ProvinceServiceProvider, public route: ActivatedRoute, public router: Router, public imageProvider: ImageServiceProvider) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.nomProvince = res.nomProvince;
      this.defaultImage = this.imageProvider.getProvinceImgGF(this.nomProvince);
      this.image = this.defaultImage;
    });

    this.provinceService.getProvinceData(this.nomProvince)
                        .then((data : any) => {
                          this.data = data;
                          this.total = this.getTotal();
                          this.percent = this.getPourcentage2(this.total);
                          this.abstinance = 100 - this.percent;
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
    let pourcentage = (nbr*100)/(this.getTotal()+12000);
    return pourcentage;
  }

  changeImage(e: any): void {
    this.image = this.imageProvider.getRegionImg(e.target.title);
  }

  resetImage(e: any): void {
    this.image = this.defaultImage;
  }

  detailRegion(e: any): void {
    this.router.navigate(['region', e.target.title]);
  }

}
