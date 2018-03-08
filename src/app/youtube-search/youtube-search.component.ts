import { Component, OnInit, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../service/auth-service/auth-service';
import { YoutubeServiceProvider } from '../service/youtube-service/youtube-service';
import { DashboardServiceProvider } from '../service/dashboard-service/dashboard-service';
import { PlaylistServiceProvider } from '../service/playlist-service/playlist-service';
import { MaterializeAction } from 'angular2-materialize';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

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
  public addVideo : any = {"titre" : "", "videoId" : "", "urlImage" : "", "idPlaylist":""};
  public addForm: FormGroup;
  public videoToPlay : any = {"id" : "" , "videoId" : "", "titre" : "" };
  public safeUrl : any = "";


  constructor(
    private auth: AuthService,
    private youtubeService: YoutubeServiceProvider,
    private playlistService: PlaylistServiceProvider,
    private dashboardService: DashboardServiceProvider,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public sanitanizer : DomSanitizer
  ) { 
    this.addForm = this.formBuilder.group({
      idPlaylist: ['', Validators.required]
    });

    this.youtubeService.search("actualité mondiale").then((result: any) => {
      this.allResult = result.items;
    }).catch(err => {
      console.log(err);
    })
  }

  ngOnInit() {
    this.dashboardService.getPlaylistByIdUser().then((result: any) => {
      this.allPlaylist = result;
      console.log(this.allPlaylist);
    }).catch((err) => {
      console.log(err);
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
  addModal(video :any) {
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
  playVideo(video){
    this.playActions.emit({ action: "modal", params: ['open'] });
    this.videoToPlay = {
      id : video.id.videoId,
      videoId : "https://www.youtube.com/embed/"+video.id.videoId+"?autoplay=1",
      titre : video.snippet.title
    };
    console.log(this.videoToPlay);
    this.safeUrl = this.sanitanizer.bypassSecurityTrustResourceUrl(this.videoToPlay.videoId);
    //this.router.navigate(['youtube-play',btoa(videoId)]);
  }


  ajouterVideo(){
    let data = 'titre='+this.addVideo.titre+'&videoId='+this.addVideo.videoId+'&urlImage='+this.addVideo.urlImage+'&idPlaylist='+this.addVideo.idPlaylist;
    this.playlistService.createVideoByIdPlaylist(data).then((result: any) => {
      this.addVideo = {"titre" : "", "videoId" : "", "urlImage" : "", "idPlaylist":""};
      this.closeModal();
      this.successModal();
      setTimeout(() => {
        this.closeSuccessModal();
      }, 1200);
    }).catch(err =>{
      console.log(err);
    })
  }

}
