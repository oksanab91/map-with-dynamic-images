import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map, concatMap } from 'rxjs/operators';

import { ImageData } from '../models/image-data';
import { MapImagesService } from '../map-images.service';
import { DispalySettingsFilter, DispalySettings } from '../models/dispaly-settings';


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


  constructor(private mapImagesService: MapImagesService) {
    this.getAll().subscribe(() => this.getImages());       
   }   

  getAll(): Observable<any> {
    return this.getDisplaySettingsAll()
    .pipe(
      map(setAll => this.displaySettings = setAll),

      concatMap(() => this.getDispalySettingsStart()
      .pipe(
        map(setFilter => this.displaySettingsFilter = setFilter)))
    );
  }

   getDispalySettingsStart(): Observable<DispalySettingsFilter> {    
    return this.mapImagesService.getDisplaySettingsStart();     
   }

   getDisplaySettingsAll(): Observable<DispalySettings> {
    return this.mapImagesService.getDisplaySettingsAll();
   }

   getImages() {    
    this.mapImagesService.getImagesFiltered(this.displaySettingsFilter.sensor)
    .pipe(
      map(
        result => {          
          this.imagesData = result;
          this.setImagesLocationsXY();          
        }
      )
    ).subscribe();    
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