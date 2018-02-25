import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceProvider } from '../../urlService/url-service';


@Injectable()
export class ProvinceServiceProvider {

    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(public http: HttpClient, public urlProvider: UrlServiceProvider) {
    }

    getProvinceData(province): Promise<any> {
        return new Promise((resolve,reject) => {
            this.http.get(this.urlProvider.getProvinceUrl(province))
                .subscribe(res => {
                        resolve(res);
                    }, err => {
                        reject(err);
                    });
                });                                         
    }


}