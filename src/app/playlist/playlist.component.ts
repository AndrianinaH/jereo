import { Component, OnInit, EventEmitter } from '@angular/core';
import { DashboardServiceProvider } from '../service/dashboard-service/dashboard-service';
import { PlaylistServiceProvider } from '../service/playlist-service/playlist-service';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../service/auth-service/auth-service';
import { MaterializeAction } from 'angular2-materialize';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

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
  public allPlaylist: any = [];
  public preloader: boolean = true;
  public changeActions = new EventEmitter<string | MaterializeAction>();
  public deleteActions = new EventEmitter<string | MaterializeAction>();
  public successActions = new EventEmitter<string | MaterializeAction>();
  public playActions = new EventEmitter<string | MaterializeAction>();
  public changeVideo : any = {"id" : "" ,"titre" : "", "videoId" : "", "urlImage" : "", "idPlaylist":"", "etat" : ""};
  public deleteVideo: any = { "id": "", "titre": "" };
  public changeForm: FormGroup;
  public videoToPlay : any = {"id" : "" , "videoId" : "", "titre" : "" };
  public safeUrl : any = "";
  

  constructor(
    private auth: AuthService,
    private playlistService: PlaylistServiceProvider,
    private dashboardService: DashboardServiceProvider,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public sanitanizer : DomSanitizer
  ) {
    this.changeForm = this.formBuilder.group({
      idPlaylist: ['', Validators.required]
    });
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
    });

    //----------------- get all playlist by id User
    this.dashboardService.getPlaylistByIdUser().then((result: any) => {
      this.allPlaylist = result;
    }).catch((err) => {
      console.log(err);
    })
  }
  //----------- change la playlist de la video
  moveVideo(){
    let data ='id='+this.changeVideo.id+'&titre='+this.changeVideo.titre+'&videoId='+this.changeVideo.videoId+'&urlImage='+this.changeVideo.urlImage+'&idPlaylist='+this.changeVideo.idPlaylist+'&etat='+this.changeVideo.etat;
    this.playlistService.updateVideoByIdPlaylist(data).then((result: any) => {
      this.allVideo = this.allVideo.filter(video => video._id !== this.changeVideo.id);
      this.changeVideo =  {"id" : "" ,"titre" : "", "videoId" : "", "urlImage" : "", "idPlaylist":"", "etat" : ""};
      this.closeChangeModal();
      this.successModal();
      setTimeout(() => {
        this.closeSuccessModal();
      }, 1200);
    }).catch(err =>{
      console.log(err);
    })
  }

  //------------------ supprimer une video
  supprimerVideo(id) {
    this.playlistService.deleteVideoById(id).then((result: any) => {
      this.allVideo = this.allVideo.filter(video => video._id !== id);
      this.deleteVideo = { "id": "", "titre": "" };
      this.closeDeleteModal();
    })
  }
  //------------------ gére les modals
  //------- change modal
  changeModal(video :any) {
    this.changeActions.emit({ action: "modal", params: ['open'] });
    this.changeVideo = {
      id : video._id,
      titre : video.titre,
      videoId : video.videoId,
      urlImage : video.urlImage,
      idPlaylist : video.idPlaylist,
      etat : video.etat
    }
  }
  closeChangeModal() {
    this.changeActions.emit({ action: "modal", params: ['close'] });
  }
  //------- delete modal
  deleteModal(video: any) {
    this.deleteActions.emit({ action: "modal", params: ['open'] });
    this.deleteVideo = { "id": video._id, "titre": video.titre };
  }
  closeDeleteModal() {
    this.deleteActions.emit({ action: "modal", params: ['close'] });
  }
  //------ success modal
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
      id : video.videoId,
      videoId : "https://www.youtube.com/embed/"+video.videoId+"?autoplay=1",
      titre : video.titre
    };
    this.safeUrl = this.sanitanizer.bypassSecurityTrustResourceUrl(this.videoToPlay.videoId);
    //this.router.navigate(['youtube-play',btoa(videoId)]);
  }

  //-------- previous video
  previousVideo(video){
    for(let i = 0; i < this.allVideo.length; i++){
      if(this.allVideo[i].videoId == video.id){
        if(this.allVideo[i-1] != undefined){
          this.videoToPlay = {
            id : this.allVideo[i-1].videoId,
            videoId : "https://www.youtube.com/embed/"+this.allVideo[i-1].videoId+"?autoplay=1",
            titre : this.allVideo[i-1].titre
          };
          console.log("previous press");
          console.log(video);
          this.safeUrl = this.sanitanizer.bypassSecurityTrustResourceUrl(this.videoToPlay.videoId);
        }
      }
    }
  }

  //-------- next video
  nextVideo(video){
    for(let i = 0; i < this.allVideo.length; i++){
      if(this.allVideo[i].videoId == video.id){
        if(this.allVideo[i+1] != undefined){
          this.videoToPlay = {
            id : this.allVideo[i+1].videoId,
            videoId : "https://www.youtube.com/embed/"+this.allVideo[i+1].videoId+"?autoplay=1",
            titre : this.allVideo[i+1].titre
          };
          console.log("next press");
          console.log(video);
          this.safeUrl = this.sanitanizer.bypassSecurityTrustResourceUrl(this.videoToPlay.videoId);
        }
      }
    }
  }



 

}
