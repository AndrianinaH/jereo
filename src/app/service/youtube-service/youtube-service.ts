import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceProvider } from '../../urlService/url-service';
import { AuthService } from '../auth-service/auth-service';

@Injectable()
export class YoutubeServiceProvider {

    public headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' });
    BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
    API_TOKEN = 'AIzaSyDamc_0bi1OOyyesps0Do7cSk6wugvPwRk';
    partAndKey = '&part=snippet&key='+this.API_TOKEN;
    maxResult = '&maxResults=12'

    constructor(
        public http: HttpClient,
        public urlProvider: UrlServiceProvider,
        public auth : AuthService
    ) {
    }

    search(query){
          return new Promise((resolve, reject) => {
            this.http.get(this.BASE_URL+'?q='+query+this.partAndKey+this.maxResult, { headers: this.headers }).subscribe(res => {
                resolve(res);
            }, err => {
                reject(err);
            });
        });
        
    }

  


}