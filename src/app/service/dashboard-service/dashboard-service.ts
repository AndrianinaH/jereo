import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceProvider } from '../../urlService/url-service';
import { AuthService } from '../auth-service/auth-service';

@Injectable()
export class DashboardServiceProvider {

    public headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' });

    constructor(
        public http: HttpClient,
        public urlProvider: UrlServiceProvider,
        public auth: AuthService
    ) {
    }

    getPlaylistByIdUser(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(this.urlProvider.getPlaylistByIdUser(this.auth.getUser()._id)).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    getPlaylistByEmail(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(this.urlProvider.getPlaylistByEmail(this.auth.getUser().email)).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }


    createPlaylistByIdUser(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(this.urlProvider.getPlaylist(), data, { headers: this.headers }).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    updatePlaylistById(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(this.urlProvider.getPlaylist(), data, { headers: this.headers }).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    deletePlaylistById(id): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete(this.urlProvider.deletePlaylistById(id), { headers: this.headers }).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    addCollaborateur(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(this.urlProvider.getAddCollaborateur(), data, { headers: this.headers }).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    removeCollaborateur(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(this.urlProvider.getRemoveCollaborateur(), data, { headers: this.headers }).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }


}