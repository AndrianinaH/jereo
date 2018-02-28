import { Component, OnInit } from '@angular/core';
import { PlaylistServiceProvider } from '../service/playlist-service/playlist-service'
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  public titre: string;
  public color: string;
  public addColor: string = 'indigo';
  public isConnected: boolean = false;

  constructor(
    public playlistService: PlaylistServiceProvider,
    public route: ActivatedRoute, public router: Router
  ){
  
  }

  ngOnInit() {
    // if(!this.isConnected) this.router.navigate(['login']);
    this.route.params.subscribe(res => {
      this.titre = res.playlist; 
      this.color = res.couleur;
    });
    
   
  }

}
