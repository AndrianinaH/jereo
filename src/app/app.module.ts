import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule,ReactiveFormsModule }   from '@angular/forms';
import { MaterializeModule } from 'angular2-materialize';

import { UrlServiceProvider } from './urlService/url-service';
import { DashboardServiceProvider } from './service/dashboard-service/dashboard-service';
import { PlaylistServiceProvider } from './service/playlist-service/playlist-service';

import { DecimalPipe } from '@angular/common';
import { PubNubAngular } from 'pubnub-angular2';

import { AppComponent } from './app.component';
import { appRoutingComponents, AppRoutingModule } from './app-routing.module';
import { AuthService } from './service/auth.service';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    appRoutingComponents,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule

  ],
  providers: [
    PubNubAngular,
    UrlServiceProvider,
    AuthService,
    PlaylistServiceProvider,
    DashboardServiceProvider,
    
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}


