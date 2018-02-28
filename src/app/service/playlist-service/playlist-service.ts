import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceProvider } from '../../urlService/url-service';


@Injectable()
export class PlaylistServiceProvider {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(public http: HttpClient, public urlProvider: UrlServiceProvider) {
    }


}