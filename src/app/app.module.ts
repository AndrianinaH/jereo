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
import { AuthService } from './service/auth-service/auth-service';
import { YoutubeServiceProvider } from './service/youtube-service/youtube-service';
import { DragDropDirectiveModule} from "angular4-drag-drop";

@NgModule({
  declarations: [
    AppComponent,
    appRoutingComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule,
    DragDropDirectiveModule
  ],
  providers: [
    PubNubAngular,
    UrlServiceProvider,
    AuthService,
    PlaylistServiceProvider,
    DashboardServiceProvider,
    YoutubeServiceProvider
    
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

}


