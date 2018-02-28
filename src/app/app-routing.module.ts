import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { PlaylistComponent } from './playlist/playlist.component';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'login', component: LoginComponent },
  { path: 'playlist/:couleur/:playlist', component: PlaylistComponent },
 
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
    PlaylistComponent
];


