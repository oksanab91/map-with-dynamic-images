import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapImagesComponent } from './map-images/map-images.component';
import { MapImageDataResponsiveComponent } from './map-image-data-responsive/map-image-data-responsive.component';

import { CloudinaryModule } from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './config-cloudinary';
import * as cloudinary from 'cloudinary-core';


@NgModule({
  declarations: [
    AppComponent,
    MapImagesComponent,
    MapImageDataResponsiveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    
    CloudinaryModule.forRoot(cloudinary, cloudinaryConfiguration),
  ],  
  bootstrap: [AppComponent]
})
export class AppModule { }
