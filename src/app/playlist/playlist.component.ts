import { Component, OnInit, EventEmitter } from '@angular/core';
import { PlaylistServiceProvider } from '../service/playlist-service/playlist-service'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../service/auth-service/auth-service';
import { MaterializeAction } from 'angular2-materialize';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  public titre: string;
  public color: string;
  public addColor: string = 'indigo';
  public playlist: any = {};
  public allVideo: any = [];
  public preloader: boolean = true;
  public deleteActions = new EventEmitter<string | MaterializeAction>();
  public deleteVideo: any = { "id": "", "titre": "" };

  constructor(
    private auth: AuthService,
    private playlistService: PlaylistServiceProvider,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit() {
    //-------------- recuperation des parametres
    this.route.params.subscribe(res => {
      this.playlist = JSON.parse(atob(res.playlist));
      this.titre = this.playlist.titre;
      this.color = this.playlist.couleur;
    });

    //----------------- get Video by idPlaylist
    this.playlistService.getVideoByIdPlaylist(this.playlist._id).then((result: any) => {
      this.allVideo = result;
      this.preloader = false;
    })
  }

  //------------------ gére les modals
  deleteModal(video: any) {
    this.deleteActions.emit({ action: "modal", params: ['open'] });
    this.deleteVideo = { "id": video._id, "titre": video.titre };
  }
  closeDeleteModal() {
    this.deleteActions.emit({ action: "modal", params: ['close'] });
  }

  //------------------ supprimer une video
  supprimerVideo(id) {
    this.playlistService.deleteVideoById(id).then((result: any) => {
      this.allVideo = this.allVideo.filter(video => video._id !== id);
      this.deleteVideo = { "id": "", "titre": "" };
      this.closeDeleteModal();
    })
  }

}
