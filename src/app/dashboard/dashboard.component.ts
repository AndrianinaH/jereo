import { Component, OnInit, EventEmitter } from '@angular/core';
import { DashboardServiceProvider } from '../service/dashboard-service/dashboard-service';
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from '../service/auth-service/auth-service';
import { MaterializeAction } from 'angular2-materialize';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PlaylistServiceProvider } from '../service/playlist-service/playlist-service';
import { NotificationService } from '../service/notification-service/notification-service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public titre: string = "Dashboard";
  public color: string = 'red';
  public addColor: string = 'indigo';
  public allPlaylist: any = [];
  public allPlaylistCollaborateur: any = [];
  public nbrVideos: any = [];
  public nbrVideosEmail: any = [];
  public preloader: boolean = true;
  public modalActions = new EventEmitter<string | MaterializeAction>();
  public updateActions = new EventEmitter<string | MaterializeAction>();
  public deleteActions = new EventEmitter<string | MaterializeAction>();
  public partageActions = new EventEmitter<string | MaterializeAction>();
  public allCollaborateurActions = new EventEmitter<string | MaterializeAction>();
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
  public partageForm: FormGroup;
  public newPlaylist: any = { "titre": "", "couleur": "" };
  public changePlaylist: any = { "id": "", "titre": "", "couleur": "", "nbrVideo": 0 };
  public partagePlaylist: any = { "id": "", "titre": "", "newUser": "", "i": 0 };
  public deletePlaylist: any = { "id": "", "titre": "" };
  public collaborateurPlaylist: any = { "id": "", "titre": "", "users": [], "i": 0 };
  public errorPartage: string = "";
 

  constructor(
    private auth: AuthService,
    private dashboardService: DashboardServiceProvider,
    private playlistService: PlaylistServiceProvider,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private notifService : NotificationService
    
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

    this.partageForm = this.formBuilder.group({
      newUser: ['', [Validators.email, Validators.required]]
    });

   

  }

  ngOnInit() {
    this.dashboardService.getPlaylistByIdUser().then((result: any) => {
      this.allPlaylist = result;
      for (let i = 0; i < this.allPlaylist.length; i++) {
        this.getNbrVideo(i, this.allPlaylist[i]._id, 1);
      }
      this.preloader = false;
    }).catch((err) => {
      console.log(err);
    });
    this.getPlayListByEmail();
   

    //-------- listener for notification push
    this.notifService.getPubNubMessage(this.auth.getUser().email,2,this.allPlaylistCollaborateur,this.nbrVideosEmail);

  }

  //------------------ get all PlaylistByEmail
  getPlayListByEmail(){
    this.dashboardService.getPlaylistByEmail().then((result: any) => {
      this.allPlaylistCollaborateur = result;
      for (let i = 0; i < this.allPlaylistCollaborateur.length; i++) {
        this.getNbrVideo(i, this.allPlaylistCollaborateur[i]._id, 2);
      }
      this.preloader = false;
    }).catch((err) => {
      console.log(err);
    });
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
  partageModal(playlist: any, i) {
    this.partageActions.emit({ action: "modal", params: ['open'] });
    this.partagePlaylist = {
      id: playlist._id,
      titre: playlist.titre,
      newUser: "",
      i: i
    }
  }
  closePartageModal() {
    this.partageActions.emit({ action: "modal", params: ['close'] });
    this.errorPartage = "";
  }
  allCollaborateurModal(playlist: any, i) {
    this.collaborateurPlaylist = {
      id: playlist._id,
      titre: playlist.titre,
      users: playlist.users,
      i: i
    }
    this.allCollaborateurActions.emit({ action: "modal", params: ['open'] });
  }
  closeAllCollaborateurModal() {
    this.allCollaborateurActions.emit({ action: "modal", params: ['close'] });
  }

  //------------------ voir les détails de la playlist
  voirDetail(playlist, privilege) {
    playlist.privilege = privilege;
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
    this.dashboardService.updatePlaylistById(data).then((result: any) => {
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
      for (let i = 0; i < this.allPlaylist.length; i++) {
        this.getNbrVideo(i, this.allPlaylist[i]._id, 1);
      }
    })
  }

  //----------------- get NbrVideo by idPlaylist
  private getNbrVideo(i, id, num) {
    this.playlistService.getVideoByIdPlaylist(id).then((result: any) => {
      if (num == 1) this.nbrVideos[i] = result.length;
      else this.nbrVideosEmail[i] = result.length;
    })
  }
  private addElement(allData, data) {
    for (let i = 0; i < allData.length; i++) {
      if (allData[i] == data) return;
    }
    allData.push(data);
  }

  //----------------- partager la playlist
  addCollaborateur(i) {
    if (this.partagePlaylist.newUser == this.auth.getUser().email) {
      this.errorPartage = "Vous êtes déjà le propriétaire de cette playlist";
    } else {
      let data = 'id=' + this.partagePlaylist.id + '&newUser=' + this.partagePlaylist.newUser;
      this.dashboardService.addCollaborateur(data).then((result: any) => {
        this.addElement(this.allPlaylist[i].users, this.partagePlaylist.newUser);

        //push notification
        //append new playlistcollaborateur
        let dataToSend = {
          notif : "Vous avez été ajouter en tant que spectateur d'une nouvelle playlist",
        };
        this.notifService.sendPubNubMessage(this.partagePlaylist.newUser, JSON.stringify(dataToSend));
        //---------- re init all object
        this.partagePlaylist = { "id": "", "titre": "", "newUser": "", "i": 0 };
        this.closePartageModal();



      })
    }

  }

  //----------------- remove la playlist (admin side)
  removeCollaborateur(id, newUser, i) {
    let data = 'id=' + id + '&newUser=' + newUser;
    this.dashboardService.removeCollaborateur(data).then((result: any) => {
      this.allPlaylist[i].users = this.allPlaylist[i].users.filter(user => user !== newUser);
      this.collaborateurPlaylist.users = this.collaborateurPlaylist.users.filter(user => user !== newUser);

      //push notification
      //remove delete playlistcollaborateur

    })
  }

  //----------------- ne plus voir la playlist (spectateur side)
  hidePlaylist(id, i) {
    let newUser = this.auth.getUser().email
    let data = 'id=' + id + '&newUser=' + this.auth.getUser().email;
    this.dashboardService.removeCollaborateur(data).then((result: any) => {
      this.allPlaylistCollaborateur = this.allPlaylistCollaborateur.filter(playlist => playlist._id !== id);
      for (let i = 0; i < this.allPlaylistCollaborateur.length; i++) {
        this.getNbrVideo(i, this.allPlaylistCollaborateur[i]._id, 2);
      }


      //pushnotification
      //remove delete playlistcollaborateur
      //remove users from list of collaborateur

    })
  }


 









}
