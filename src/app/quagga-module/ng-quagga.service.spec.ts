import { TestBed, inject } from '@angular/core/testing';

import { NgQuaggaService } from './ng-quagga-service.service';

describe('NgQuaggaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgQuaggaService]
    });
  });

  it('should be created', inject([NgQuaggaService], (service: NgQuaggaService) => {
    expect(service).toBeTruthy();
  }));
});
