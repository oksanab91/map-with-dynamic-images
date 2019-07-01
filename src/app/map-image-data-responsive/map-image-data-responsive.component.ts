import { Component, Input } from '@angular/core';
import { ImageData } from '../models/image-data';

@Component({
  selector: 'map-image-data-responsive',
  templateUrl: './map-image-data-responsive.component.html',
  styleUrls: ['./map-image-data-responsive.component.css']
})
export class MapImageDataResponsiveComponent {
  @Input('image-data') image: ImageData;

  constructor() { }

  styleImageLocation(): Object {
    return {left: `${this.image.xResponsive}%`, top: `${this.image.yResponsive}%`};
  }
}
