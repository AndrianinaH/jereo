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


}