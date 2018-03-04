import { Component, OnInit, EventEmitter } from '@angular/core';
import { DashboardServiceProvider } from '../service/dashboard-service/dashboard-service';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../service/auth-service/auth-service';
import { MaterializeAction } from 'angular2-materialize';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlaylistServiceProvider } from '../service/playlist-service/playlist-service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public titre: string = "Dashboard";
  public color: string = 'red';
  public addColor: string = 'indigo';
  public allPlaylist: any = [];
  public nbrVideos: any = [];
  public preloader: boolean = true;
  public modalActions = new EventEmitter<string | MaterializeAction>();
  public updateActions = new EventEmitter<string | MaterializeAction>();
  public deleteActions = new EventEmitter<string | MaterializeAction>();
  public allColor = [
    "indigo",
    "amber",
    "grey",
    "red",
    "cyan",
    "blue",
    "pink",
    "teal",
    "brown",
    "deep-purple",
    "green",
    "deep-orange"
  ];
  public addForm: FormGroup;
  public updateForm: FormGroup;
  public newPlaylist: any = { "titre": "", "couleur": "" };
  public changePlaylist: any = { "id": "", "titre": "", "couleur": "", "nbrVideo": 0 };
  public deletePlaylist: any = { "id": "", "titre": "" };


  constructor(
    private auth: AuthService,
    private dashboardService: DashboardServiceProvider,
    private playlistService: PlaylistServiceProvider,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.addForm = this.formBuilder.group({
      titre: ['', Validators.required],
      couleur: ['', Validators.required]
    });

    this.updateForm = this.formBuilder.group({
      id: ['', Validators.required],
      titre: ['', Validators.required],
      couleur: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.dashboardService.getPlaylistByIdUser().then((result: any) => {
      this.allPlaylist = result;
      for (let i = 0; i <  this.allPlaylist.length; i++) {
       this.getNbrVideo(i,  this.allPlaylist[i]._id);
      }
      this.preloader = false;
    }).catch((err) => {
      console.log(err);
    })
  }
  //------------------ gére les modals 
  addModal() {
    this.modalActions.emit({ action: "modal", params: ['open'] });
  }
  closeModal() {
    this.modalActions.emit({ action: "modal", params: ['close'] });
  }
  updateModal(playlist: any) {
    this.updateActions.emit({ action: "modal", params: ['open'] });
    this.changePlaylist = { "id": playlist._id, "titre": playlist.titre, "couleur": playlist.couleur, "nbrVideo": playlist.nbrVideo };
  }
  closeUpdateModal() {
    this.updateActions.emit({ action: "modal", params: ['close'] });
  }

  deleteModal(playlist: any) {
    this.deleteActions.emit({ action: "modal", params: ['open'] });
    this.deletePlaylist = { "id": playlist._id, "titre": playlist.titre };
  }
  closeDeleteModal() {
    this.deleteActions.emit({ action: "modal", params: ['close'] });
  }

  //------------------ voir les détails de la playlist
  voirDetail(playlist) {
    let playlistEncode = JSON.stringify(playlist);
    this.router.navigate(['playlist', btoa(playlistEncode)]);
  }

  //------------------ créer une nouvelle playlist
  createPlaylist() {
    let data = 'titre=' + this.newPlaylist.titre + '&couleur=' + this.newPlaylist.couleur + '&idUser=' + this.auth.getUser()._id;
    this.dashboardService.createPlaylistByIdUser(data).then((result: any) => {
      this.allPlaylist.push({
        _id: result._id,
        titre: result.titre,
        couleur: result.couleur,
        etat: result.etat,
        idUser: this.auth.getUser()._id,
        nbrVideo: 0
      });
      this.newPlaylist = { "titre": "", "couleur": "" };
      this.closeModal();
    })
  }

  //------------------ modifier une playlist
  updatePlaylist() {
    let data = 'id=' + this.changePlaylist.id + '&titre=' + this.changePlaylist.titre + '&couleur=' + this.changePlaylist.couleur + '&idUser=' + this.auth.getUser()._id + '&etat=1';
    this.dashboardService.updatePlaylistByIdUser(data).then((result: any) => {
      let playUpdate = {
        _id: result._id,
        titre: result.titre,
        couleur: result.couleur,
        idUser: this.auth.getUser()._id,
        etat: result.etat,
        nbrVideo: this.changePlaylist.nbrVideo,
      };
      this.replaceElement(this.allPlaylist, playUpdate);
      this.changePlaylist = { "id": "", "titre": "", "couleur": "", "nbrVideo": 0 };
      this.closeUpdateModal();
    })
  }

  private replaceElement(allData, data) {
    for (let i = 0; i < allData.length; i++) {
      if (allData[i]._id == data._id) allData[i] = data;
    }
  }

  //------------------ supprimer une playlist
  supprimerPlaylist(id) {
    this.dashboardService.deletePlaylistById(id).then((result: any) => {
      this.allPlaylist = this.allPlaylist.filter(play => play._id !== id);
      this.deletePlaylist = { "id": "", "titre": "" };
      this.closeDeleteModal();
    })
  }

  //----------------- get NbrVideo by idPlaylist
  getNbrVideo(i, id) {
    this.playlistService.getVideoByIdPlaylist(id).then((result: any) => {
      this.nbrVideos[i] = result.length;
    })
  }
}
