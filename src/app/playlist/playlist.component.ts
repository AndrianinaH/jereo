import { Component, OnInit } from '@angular/core';
import { PlaylistServiceProvider } from '../service/playlist-service/playlist-service'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../service/auth-service/auth-service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  public titre: string;
  public color: string;
  public addColor: string = 'indigo';

  constructor(
    private auth : AuthService,
    private playlistService: PlaylistServiceProvider,
    private route: ActivatedRoute, 
    private router: Router
  ){
  
  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      this.titre = res.playlist; 
      this.color = res.couleur;
    });
    
   
  }

}
