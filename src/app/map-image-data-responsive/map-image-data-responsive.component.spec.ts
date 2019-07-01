import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapImageDataResponsiveComponent } from './map-image-data-responsive.component';

describe('MapImageDataResponsiveComponent', () => {
  let component: MapImageDataResponsiveComponent;
  let fixture: ComponentFixture<MapImageDataResponsiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapImageDataResponsiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapImageDataResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
