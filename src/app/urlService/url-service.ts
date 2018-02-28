import { Injectable } from '@angular/core';


@Injectable()
export class UrlServiceProvider {

    // private baseUrl: string = "http://192.168.43.223:8080/dashboard/";
    private baseUrl: string = "http://localhost:8080/dashboard/";

    validateResultUrl(id: string): string {
        return this.baseUrl + "validate?id=" + id;
    }

    getResultatsNonValidesUrl(bool: boolean): string {
        return  this.baseUrl + "findByValidation?valide=" + bool;
    }

    getDashboardUrl(): string {
        return this.baseUrl;
    }

    getProvinceUrl(province): string {
        return this.baseUrl + "province?province=" + province;
    }

    getRegionUrl(region): string {
        return this.baseUrl + "region?region=" + region;
    }

    getDistrictUrl(district): string {
        return this.baseUrl + "district?district=" + district;
    }


}