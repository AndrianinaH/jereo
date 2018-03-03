import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceProvider } from '../../urlService/url-service';
import { AuthService } from '../auth-service/auth-service';

@Injectable()
export class PlaylistServiceProvider {

    public headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'});

    constructor(
        public http: HttpClient,
        public urlProvider: UrlServiceProvider,
        public auth : AuthService
    ) {
    }


}