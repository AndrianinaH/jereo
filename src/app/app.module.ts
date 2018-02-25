import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DashboardServiceProvider } from './service/dashboard-service/dashboard-service';
import { UrlServiceProvider } from './urlService/url-service';
import { ImageServiceProvider } from './service/image-service/image-service';


import { RegionComponent } from './region/region.component';
import { DistrictComponent } from './district/district.component';
import { CommuneComponent } from './commune/commune.component';
import { ProvinceComponent } from './province/province.component';
import { DecimalPipe } from '@angular/common';
import { ProvinceServiceProvider } from './service/province-service/province-service';
import { RegionServiceProvider } from './service/region-service/region-service';
import { DistrictServiceProvider } from './service/district-service/district-service';
import { ValidationComponent } from './validation/validation.component';
import { TraiterComponent } from './traiter/traiter.component';
import { ValidationServiceProvider } from './service/validation-service/validation-service';

const appRoutes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'province/:nomProvince', component: ProvinceComponent },
  { path: 'region/:nomRegion', component: RegionComponent },
  { path: 'district/:nomDistrict', component: DistrictComponent },
  { path: 'commune', component: CommuneComponent },
  { path: 'validation', component: ValidationComponent },
  { path: 'traiter/:idBureau', component: TraiterComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProvinceComponent,
    RegionComponent,
    DistrictComponent,
    CommuneComponent,
    ValidationComponent,
    TraiterComponent,
  
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,

  ],
  providers: [
    DashboardServiceProvider,
    UrlServiceProvider,
    ImageServiceProvider,
    RegionServiceProvider,
    ProvinceServiceProvider,
    DistrictServiceProvider,
    ValidationServiceProvider
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}


