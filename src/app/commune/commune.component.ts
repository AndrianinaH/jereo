import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router'

@Component({
  selector: 'app-commune',
  templateUrl: './commune.component.html',
  styleUrls: ['./commune.component.css']
})
export class CommuneComponent implements OnInit {

  private image ;
  private titre : string = "District";
  private data: any;
  private nombreElecteur: number = 8254;
  private district: string;

  constructor( public route: ActivatedRoute, public router : Router) { }

  ngOnInit() {
  
  }

  getCommunes(): void {

  }
}