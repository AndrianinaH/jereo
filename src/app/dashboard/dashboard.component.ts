import { Component, OnInit } from '@angular/core';
import { DashboardServiceProvider } from '../service/dashboard-service/dashboard-service';
import { ActivatedRoute, Router } from '@angular/router'
import { ImageServiceProvider } from '../service/image-service/image-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private InValidation: boolean = false;
  private nombreElecteur = 43405;
  private image;
  private titre: string = "Tableau de bord"
  private data: any = {};
  private total: number = 0;
  private percent: number = 0;
  private abstinance: number = 0;

  constructor(public dashboardService: DashboardServiceProvider, public route: ActivatedRoute, public router: Router, public imageProvider: ImageServiceProvider) { }

  ngOnInit() {
    this.image = this.imageProvider.getMadaImg();
    this.dashboardService.getDashboardData()
      .then(data => {
        this.data = data
        this.total = this.getTotal();
        this.percent = this.getPourcentage2(this.total);
        this.abstinance = 100 - this.percent;
      });
  }

  changeImage(e: any): void {
    this.image = this.imageProvider.getProvinceImg(e.target.title);
  }

  resetImage(e: any): void {
    this.image = this.imageProvider.getMadaImg();
  }

  detailProvince(e: any): void {
    console.log(e);
    this.router.navigate(['province', e.target.title]);
  }

  getTotal() {
    let total = 0;
    this.data.candidatList.forEach(element => {
      total += element.nombre
    });
    return total;
  }

  getPourcentage(nbr: number) {
    let pourcentage = (nbr * 100) / this.getTotal();
    return pourcentage;
  }
  getPourcentage2(nbr: number) {
    let pourcentage = (nbr * 100) / (this.getTotal()+45000);
    return pourcentage;
  }

}
