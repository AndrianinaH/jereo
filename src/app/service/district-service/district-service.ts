import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceProvider } from '../../urlService/url-service';


@Injectable()
export class DistrictServiceProvider {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(public http: HttpClient, public urlProvider: UrlServiceProvider) {
    }

    getDistrictData(district): Promise<any> {
        return new Promise((resolve,reject) => {
            this.http.get(this.urlProvider.getDistrictUrl(district))
                .subscribe(res => {
                        resolve(res);
                    }, err => {
                        reject(err);
                    });
                });                                         
    }


}