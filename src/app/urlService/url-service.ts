import { Injectable } from '@angular/core';


@Injectable()
export class UrlServiceProvider {

    // private baseUrl: string = "http://localhost:3000/api/";
    private baseUrl: string = "https://m1p5mean-26-andrianina.herokuapp.com/api/";


    //--------------------- Authentification
    login() : string{
        return this.baseUrl + "login";
    }

    signin() : string{
        return this.baseUrl + "signin";
    }

    //------------------- Playlist
    getPlaylistByIdUser(idUser : string) : string{
        return this.baseUrl + "playlist/" + idUser;
    }

    getPlaylistByEmail(email : string) : string{
        return this.baseUrl + "playlistByEmail/" + email;
    }

    getPlaylistDeleteByIdUser(idUser : string) : string{
        return this.baseUrl + "playlistDelete/" + idUser;
    }
    
    getPlaylist() : string{
        return this.baseUrl + "playlist";
    }

    deletePlaylistById(id :string) : string{
        return this.baseUrl + "playlist/" + id;
    }

    getAddCollaborateur() : string{
        return this.baseUrl + "playlist/newUser";
    }
    getRemoveCollaborateur() : string{
        return this.baseUrl + "playlist/removeUser";
    }

    //------------------- Video
    getVideoByIdPlaylist(idPlaylist : string) : string{
    return this.baseUrl + "video/" + idPlaylist;
    }

    getVideoDeleteByIdPlaylist(idPlaylist : string) : string{
        return this.baseUrl + "videoDelete/" + idPlaylist;
    }
    
    getVideo() : string{
        return this.baseUrl + "video";
    }

    deleteVideoById(id :string) : string{
        return this.baseUrl + "video/" + id;
    }


   


}