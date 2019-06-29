import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapImagesComponent } from './map-images/map-images.component';
import { MapImagesService } from './map-images.service';
import { FormsModule} from '@angular/forms';

import {CloudinaryModule} from '@cloudinary/angular-5.x';
import cloudinaryConfiguration from './config-cloudinary';
import * as cloudinary from 'cloudinary-core';

@NgModule({
  declarations: [
    AppComponent,
    MapImagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,    
    CloudinaryModule.forRoot(cloudinary, cloudinaryConfiguration),  

  ],
  providers: [MapImagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
