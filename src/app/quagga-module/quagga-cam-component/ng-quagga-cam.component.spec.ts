import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuaggaCamComponent } from './quagga-cam-component.component';

describe('QuaggaCamComponent', () => {
  let component: QuaggaCamComponent;
  let fixture: ComponentFixture<QuaggaCamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuaggaCamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuaggaCamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
