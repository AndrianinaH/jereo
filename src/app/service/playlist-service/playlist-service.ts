import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceProvider } from '../../urlService/url-service';
import { AuthService } from '../auth-service/auth-service';

@Injectable()
export class PlaylistServiceProvider {

    public headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' });

    constructor(
        public http: HttpClient,
        public urlProvider: UrlServiceProvider,
        public auth : AuthService
    ) {
    }

    getVideoByIdPlaylist(id): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.get(this.urlProvider.getVideoByIdPlaylist(id)).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    createVideoByIdPlaylist(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.post(this.urlProvider.getVideo(), data, { headers: this.headers }).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    updateVideoByIdPlaylist(data): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.put(this.urlProvider.getVideo(), data, { headers: this.headers }).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }

    deleteVideoById(id): Promise<any> {
        return new Promise((resolve, reject) => {
            this.http.delete(this.urlProvider.deleteVideoById(id), { headers: this.headers }).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
    }


}