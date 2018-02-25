import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceProvider } from '../../urlService/url-service';


@Injectable()
export class RegionServiceProvider {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(public http: HttpClient, public urlProvider: UrlServiceProvider) {
    }

    getRegionData(region): Promise<any> {
        return new Promise((resolve,reject) => {
            this.http.get(this.urlProvider.getRegionUrl(region))
                .subscribe(res => {
                        resolve(res);
                    }, err => {
                        reject(err);
                    });
                });                                         
    }


}