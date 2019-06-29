import { TestBed } from '@angular/core/testing';

import { MapImagesService } from './map-images.service';

describe('MapImagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MapImagesService = TestBed.get(MapImagesService);
    expect(service).toBeTruthy();
  });
});
