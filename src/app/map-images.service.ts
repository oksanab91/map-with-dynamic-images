import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { Cloudinary } from '@cloudinary/angular-5.x';

import { ImageData } from './models/image-data';
import { DispalySettingsJson, DispalySettings } from './models/dispaly-settings';

@Injectable({
  providedIn: 'root'
})
export class MapImagesService {
  getUrl = `${environment.apiUrl}images`;
  settingUrl = `${environment.assetsUrl}display_settings.json`;

  constructor(private http: HttpClient, private cloudinary: Cloudinary) {
  }

  getImages(sensor?: string[]): Observable<ImageData[]> {
    if(sensor) {
      this.getUrl += `/${sensor}`;
    }
    return of(this.seedImages(sensor));
  }

  getDisplaySettingsStart(): Observable<DispalySettingsJson> {    
    return this.http.get<DispalySettingsJson>(this.settingUrl);
  }

  getDisplaySettingsAll(): DispalySettings {   
    let settings: DispalySettings = 
      {
        Sensors: ['OGEN', 'IKONOS', 'OFEK', 'GEOEYE'],
        Backgrounds: ['Blue', 'White', 'Lightseagreen']      
      };

    return settings;
  }

  private buildImageSrcUrl({name, sensor, x, y, clipX, clipY, clipW, clipH}){
    return this.cloudinary.url(`${name.toLowerCase()}_responsive.jpg`, { crop: "crop", gravity: "north_west", width: clipW, height: clipH, x: clipX, y: clipY});   
  }  

  private seedImages(sensors?: string[]): ImageData[] {
    let data = [
      {name: 'Frog', sensor: 'IKONOS', x:	0, y:	0, clipX:	800, clipY:	640, clipW:	300, clipH: 400},
      {name: 'Bull', sensor: 'IKONOS', x:	50, y: 350, clipX: 1300, clipY:	600, clipW:	700, clipH: 500},
      {name: 'Dog', sensor: 'GEOEYE', x: 250, y: 15, clipX:	500, clipY:	200, clipW:	500, clipH: 450},
      {name: 'Cat', sensor: 'OFEK', x: 310, y: 360, clipX: 600, clipY:	300, clipW:	350, clipH: 300}
    ];

    if(sensors && sensors.length>0 && sensors.indexOf('')<0){
      data = data.filter(item => sensors.indexOf(item.sensor)>=0);
    }        

    let imagesData: ImageData[] = [];

    data.forEach(element => {
      let imgUrl = this.buildImageSrcUrl(element);
      imagesData.push(new ImageData(element, imgUrl));
    });  

    return imagesData;
  }
}