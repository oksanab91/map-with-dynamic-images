import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cloudinary } from '@cloudinary/angular-5.x';

import { ImageData } from './models/image-data';
import { DispalySettingsJson, DispalySettings } from './models/dispaly-settings';


@Injectable({
  providedIn: 'root'
})
export class MapImagesService {
  getUrl = `${environment.apiUrl}`;
  settingUrl = `${environment.assetsUrl}display_settings.json`;
  static images: ImageData[];   

  constructor(private http: HttpClient, private cloudinary: Cloudinary) {    
    if(!MapImagesService.images){     
      this.getImages().subscribe(result => {MapImagesService.images = result})
    }   
  }

  getImages(sensors?: string[]): Observable<ImageData[]> {
    if(MapImagesService.images){
      return of(this.filterImages(MapImagesService.images, sensors));
    }

    let url = `${this.getUrl}images`;
    
    return this.http.get<ImageData[]>(url)
    .pipe(
      map(im => { return this.filterImages(im, sensors); }      
      )
    );

  }

  private filterImages(images: ImageData[], sensors?: string[]): ImageData[]{
    let imagesUpdated: ImageData[] = [];

    if(sensors && sensors.length>0 && sensors.indexOf('')<0){
      imagesUpdated = images.filter(item => sensors.indexOf(item.sensor)>=0).map(item => this.setImageSrcUrl(item))          
    } else {
      imagesUpdated = images.map(item => this.setImageSrcUrl(item));
    }
    
    return imagesUpdated;
  }

  getDisplaySettingsStart(): Observable<DispalySettingsJson> {    
    return this.http.get<DispalySettingsJson>(this.settingUrl);
  }

  getDisplaySettingsAll(): Observable<DispalySettings> {
    let url = `${this.getUrl}displaySettings`;

    return this.http.get<DispalySettings>(url);
  }

  private setImageSrcUrl(image: ImageData): ImageData{ 
    let data = new ImageData();
    data = {
      ...image,
      srcUrl: this.cloudinary.url(`${image.name.toLowerCase()}_responsive.jpg`, 
        { crop: "crop", gravity: "north_west", width: image.clipW, 
        height: image.clipH, x: image.clipX, y: image.clipY})
    };
    return data;  
  }
    
}