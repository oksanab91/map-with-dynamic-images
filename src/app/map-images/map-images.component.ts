import { Component } from '@angular/core';
import { ImageData } from '../models/image-data';
import { HttpErrorResponse } from '@angular/common/http';
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

  constructor(private mapImagesService: MapImagesService, private cloudinary: Cloudinary) {    
    
    this.getDispalySettingsStart().subscribe(result =>{
      this.displaySettingsFilter = result['display-settings'];
      
      this.getDisplaySettingsAll().subscribe(setting => {
        
        this.displaySettings = setting;   
        if(this.displaySettingsFilter){
          this.getImages();
        }        
        }
      ); 
    });

   }   

   getDispalySettingsStart(): Observable<DispalySettingsJson> {    
    return this.mapImagesService.getDisplaySettingsStart();     
   }

   getDisplaySettingsAll(): Observable<DispalySettings> {
    return this.mapImagesService.getDisplaySettingsAll();
   }

   getImages() {
    this.mapImagesService.getImages(this.displaySettingsFilter.sensor).subscribe(result => {
      this.imagesData = result;
      this.setImagesLocationsXY();

      }, (error: HttpErrorResponse) => {        
        if (error.status == 404){
          return;
        }
      });
      
  }

  refreshForm(event) {
    const indexAll = this.displaySettingsFilter.sensor.indexOf('');

    if(indexAll>0){
      this.displaySettingsFilter.sensor = this.displaySettingsFilter.sensor.slice(indexAll, indexAll);
    }
    this.getImages();
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