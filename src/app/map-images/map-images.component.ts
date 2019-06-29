import { Component } from '@angular/core';
import { ImageData } from '../models/image-data';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { MapImagesService } from '../map-images.service';
import { DispalySettingsFilter, DispalySettingsJson, DispalySettings } from '../models/dispaly-settings';
import { Observable } from 'rxjs';
import { Cloudinary } from '@cloudinary/angular-5.x'; 


const mapContainerHeigth = 900;
const mapContainerWidth = 1460;

@Component({
  selector: 'app-map-images',
  templateUrl: './map-images.component.html',
  styleUrls: ['./map-images.component.css']  
})
export class MapImagesComponent {  
  imagesData: ImageData[] = [];
  displaySettings: DispalySettings;
  displaySettingsFilter: DispalySettingsFilter;  
  getUrl: string;  

  constructor(private mapImagesService: MapImagesService, private cloudinary: Cloudinary) {
    this.getUrl = `${environment.apiUrl}images`;
    
    this.getDyspalySettingsStart().subscribe(result =>{
      this.displaySettingsFilter = result['display-settings'];
      this.displaySettings = this.getDisplaySettingsAll();

      if(this.displaySettingsFilter){
        this.getImages();        
      }      
    });

   }   

   getDyspalySettingsStart(): Observable<DispalySettingsJson> {    
    return this.mapImagesService.getDisplaySettingsStart();     
   }

   getDisplaySettingsAll() {
    return this.mapImagesService.getDisplaySettingsAll();
   }

   getImages() {
    this.mapImagesService.getImages(this.displaySettingsFilter.Sensor).subscribe(result => {
      this.imagesData = result;
      this.setImagesLocationsXY();

      }, (error: HttpErrorResponse) => {        
        if (error.status == 404){
          return;
        }
      });
  }

  refreshForm(event) {
    const indexAll = this.displaySettingsFilter.Sensor.indexOf('');

    if(indexAll>0){
      this.displaySettingsFilter.Sensor = this.displaySettingsFilter.Sensor.slice(indexAll, indexAll);
    }
    this.getImages();
  }

  styleImageLocation(image: ImageData): Object {
    return {left: `${image.xResponsive}%`, top: `${image.yResponsive}%`};
  }

  setImagesLocationsXY(): void {
    this.imagesData.forEach(image => {
      let y = image.y / mapContainerHeigth * 100;
      let x = image.x / mapContainerWidth * 100;

      image.xResponsive = Math.round(x);
      image.yResponsive = Math.round(y);    
    });

  }

}