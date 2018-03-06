import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { SigninComponent } from './signin/signin.component';
import { YoutubeSearchComponent } from './youtube-search/youtube-search.component';
import { YoutubePlayComponent } from './youtube-play/youtube-play.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signin', component: SigninComponent },
  { path: 'playlist/:playlist', component: PlaylistComponent },
  { path: 'youtube-search', component: YoutubeSearchComponent },
  { path: 'youtube-play/:videoId', component: YoutubePlayComponent },
 
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes),
  ],
  exports:[RouterModule]

})

export class AppRoutingModule {
}

export const appRoutingComponents = [
    DashboardComponent,
    PlaylistComponent,
    LoginComponent,
    MenuComponent,
    SigninComponent,
    YoutubeSearchComponent,
    YoutubePlayComponent
];


