import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapImagesComponent } from './map-images/map-images.component';

const routes: Routes = [
  { path: '', redirectTo: '/map-images', pathMatch: 'full' },
  { path: 'map-images', component: MapImagesComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
