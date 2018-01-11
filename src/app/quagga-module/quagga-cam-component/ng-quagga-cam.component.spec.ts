import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgQuaggaCamComponent } from './ng-quagga-cam.component';

describe('NgQuaggaCamComponent', () => {
  let component: NgQuaggaCamComponent;
  let fixture: ComponentFixture<NgQuaggaCamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgQuaggaCamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgQuaggaCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
