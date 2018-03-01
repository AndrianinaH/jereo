import { Component, OnInit } from '@angular/core';
import { DashboardServiceProvider } from '../service/dashboard-service/dashboard-service';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../service/auth-service/auth-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public titre: string = "Dashboard";
  public color: string = 'red';
  public addColor: string = 'indigo';

  constructor(
    private auth : AuthService,
    private dashboardService: DashboardServiceProvider,
    private route: ActivatedRoute, 
    private router: Router
  ){

  }

  ngOnInit() {
    
  }

  //------------------ voir les détails de la playlist
  voirDetail(couleur, playlistName){
    this.router.navigate(['playlist',couleur,playlistName]);
  }
}
