import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlServiceProvider } from '../../urlService/url-service';

@Injectable()
export class ValidationServiceProvider {

    private headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    // private headers = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded; charset=utf-8'});

    constructor(public http: HttpClient, public urlProvider: UrlServiceProvider) {
    }

    getResultatsNonValides(): Promise<any> {
        return new Promise((resolve,reject) => {
            this.http.get(this.urlProvider.getResultatsNonValidesUrl(false), { headers: this.headers })
                .subscribe(res => {
                        resolve(res);
                    }, err => {
                        reject(err);
                    });
                });                                         
    }

    getResultatsByBureau(id: number):  Promise<any> {
        return new Promise((resolve,reject) => {
            this.http.get(this.urlProvider.getResultatsNonValidesByBureauUrl(id), { headers: this.headers })
                .subscribe(res => {
                        resolve(res);
                    }, err => {
                        reject(err);
                    });
                });                                         
    }

    validateResults(id: string): Promise<any> {
        return new Promise((resolve,reject) => {
            this.http.get(this.urlProvider.validateResultUrl(id), { headers: this.headers })
                .subscribe(res => {
                        resolve(res);
                    }, err => {
                        reject(err);
                    });
                });  
    }

    


}