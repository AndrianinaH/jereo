import { Injectable } from '@angular/core';

@Injectable()
export class ImageServiceProvider {

    private url = 'assets/images/';

    getProvinceImg(name: string): string {
        return this.url + 'provinces/' + name + '.png';
    }

    getDistrictImg(name: string): string {
        return this.url + 'districts/' + name + '.png';
    }

    getRegionImg(name: string): string {
        return this.url + 'regions/' + name + '.png';
    }

    getProvinceImgGF(name: string): string {
        return this.url + 'provinces/province/P_' + name + '.png';
    }

    getDistrictImgGF(name: string): string {
        return this.url + 'districts/district/' + name + '.png';
    }

    getRegionImgGF(name: string): string {
        return this.url + 'regions/region/R_' + name + '.png';
    }

    getMadaImg(): string {
        return this.url + 'Mada.png';
    }



}
