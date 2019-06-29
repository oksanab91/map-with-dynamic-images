import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapImagesComponent } from './map-images.component';

describe('MapImagesComponent', () => {
  let component: MapImagesComponent;
  let fixture: ComponentFixture<MapImagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapImagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
