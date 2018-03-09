import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../service/auth-service/auth-service';
import { YoutubeServiceProvider } from '../service/youtube-service/youtube-service';
import { DashboardServiceProvider } from '../service/dashboard-service/dashboard-service';
import { PlaylistServiceProvider } from '../service/playlist-service/playlist-service';
import { MaterializeAction } from 'angular2-materialize';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-youtube-search',
  templateUrl: './youtube-search.component.html',
  styleUrls: ['./youtube-search.component.css']
})
export class YoutubeSearchComponent implements OnInit {

  public data: string = "";
  public addColor: string = 'indigo';
  public allPlaylist: any = [];
  public allResult: any = [];
  public imageprovisoire: string = "/assets/images/office2.jpg";
  public addActions = new EventEmitter<string | MaterializeAction>();
  public successActions = new EventEmitter<string | MaterializeAction>();
  public playActions = new EventEmitter<string | MaterializeAction>();
  public addVideo: any = { "titre": "", "videoId": "", "urlImage": "", "idPlaylist": "" };
  public addForm: FormGroup;
  public videoToPlay: any = { "id": "", "videoId": "", "titre": "" };
  public safeUrl: SafeResourceUrl = "";
  public preloader: boolean = true;
  //---- menu
  public isConnected: boolean = false;
  public user: any = {};
  public color: string = 'red';
  public badgeColor: string = '';
  public nbrVideos: any = [];


  constructor(
    private auth: AuthService,
    private youtubeService: YoutubeServiceProvider,
    private playlistService: PlaylistServiceProvider,
    private dashboardService: DashboardServiceProvider,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public sanitanizer: DomSanitizer
  ) {
    this.addForm = this.formBuilder.group({
      idPlaylist: ['', Validators.required]
    });

    this.youtubeService.search("actualité mondiale").then((result: any) => {
      this.allResult = result.items;
      this.preloader = false;
    }).catch(err => {
      console.log(err);
    })
  }

  ngOnInit() {
    this.isConnected = this.auth.isConnected();
    if (!this.isConnected) this.router.navigate(['login']);
    this.user = this.auth.getUser();

    this.dashboardService.getPlaylistByIdUser().then((result: any) => {
      this.allPlaylist = result;
      for (let i = 0; i < this.allPlaylist.length; i++) {
        this.getNbrVideo(i, this.allPlaylist[i]._id);
      }
    }).catch((err) => {
      console.log(err);
    })
  }

  //----------------- get NbrVideo by idPlaylist
  getNbrVideo(i, id) {
    this.playlistService.getVideoByIdPlaylist(id).then((result: any) => {
      this.nbrVideos[i] = result.length;
    })
  }

  searchVideo() {
    this.youtubeService.search(this.data).then((result: any) => {
      this.allResult = result.items;
    }).catch(err => {
      console.log(err);
    })
  }
  //------------------ gére les modals 
  addModal(video: any) {
    this.addActions.emit({ action: "modal", params: ['open'] });
    this.addVideo.videoId = video.id.videoId;
    this.addVideo.titre = video.snippet.title;
    this.addVideo.urlImage = video.snippet.thumbnails.default.url;
  }
  closeModal() {
    this.addActions.emit({ action: "modal", params: ['close'] });
  }

  successModal() {
    this.successActions.emit({ action: "modal", params: ['open'] });
  }
  closeSuccessModal() {
    this.successActions.emit({ action: "modal", params: ['close'] });
  }
  closePlayModal() {
    this.playActions.emit({ action: "modal", params: ['close'] });
  }
  //-------- modal play video
  playVideo(video) {
    this.playActions.emit({ action: "modal", params: ['open'] });
    this.videoToPlay = {
      id: video.id.videoId,
      videoId: "https://www.youtube.com/embed/" + video.id.videoId + "?autoplay=1",
      titre: video.snippet.title
    };
    console.log(this.videoToPlay);
    this.safeUrl = this.sanitanizer.bypassSecurityTrustResourceUrl(this.videoToPlay.videoId);
    //this.router.navigate(['youtube-play',btoa(videoId)]);
  }


  ajouterVideo() {
    let data = 'titre=' + this.addVideo.titre + '&videoId=' + this.addVideo.videoId + '&urlImage=' + this.addVideo.urlImage + '&idPlaylist=' + this.addVideo.idPlaylist;
    this.playlistService.createVideoByIdPlaylist(data).then((result: any) => {
      this.addVideo = { "titre": "", "videoId": "", "urlImage": "", "idPlaylist": "" };
      this.closeModal();
      this.successModal();
      setTimeout(() => {
        this.closeSuccessModal();
      }, 1200);
    }).catch(err => {
      console.log(err);
    })
  }

  //--------------------- menu
  //-------------- displayUser in dashboard --------------//
  getInitial(pseudo) {
    return pseudo.charAt(0).toUpperCase();
  }

  getColor() {
    var num = Math.floor((Math.random() * 10) + 1);
    switch (num) {
      case 1:
        return "blue";
      case 2:
        return "amber";
      case 3:
        return "grey";
      case 4:
        return "green";
      case 5:
        return "cyan";
      case 6:
        return "indigo";
      case 7:
        return "purple";
      case 8:
        return "brown";
      case 9:
        return "orange";
      case 10:
        return "red darken-4";
    }
  }

  //-------------- logout --------------//
  deconnexion() {
    this.isConnected = this.auth.deconnexion();
    this.router.navigate(['login']);
  }

  //----------- drag and drop 
  //----add video to playlist
  addDropItem(video, id, i) {
    this.nbrVideos[i] += 1;
    this.ajouterVideoDragDrop(video, id);
  }

  ajouterVideoDragDrop(video, id) {
    this.addVideo.videoId = video.id.videoId;
    this.addVideo.titre = video.snippet.title;
    this.addVideo.urlImage = video.snippet.thumbnails.default.url;
    this.addVideo.idPlaylist = id;
    this.ajouterVideo();
  }

  //------------------ voir les détails de la playlist
  voirDetail(playlist) {
    let playlistEncode = JSON.stringify(playlist);
    this.router.navigate(['playlist', btoa(playlistEncode)]);
  }

}
