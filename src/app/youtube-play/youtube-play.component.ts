import { Component, OnInit, EventEmitter } from '@angular/core';
import { PlaylistServiceProvider } from '../service/playlist-service/playlist-service'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../service/auth-service/auth-service';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';


@Component({
  selector: 'app-youtube-play',
  templateUrl: './youtube-play.component.html',
  styleUrls: ['./youtube-play.component.css']
})
export class YoutubePlayComponent implements OnInit {

  public videoId : SafeResourceUrl = "";
  constructor(
    private auth: AuthService,
    private playlistService: PlaylistServiceProvider,
    private route: ActivatedRoute,
    private router: Router,
    public sanitanizer : DomSanitizer
  ) { }

  ngOnInit() {
     //-------------- recuperation des parametres
     this.route.params.subscribe(res => {
      this.videoId = "https://www.youtube.com/embed/"+atob(res.videoId)+"?autoplay=1";
     
    });
  }

}
