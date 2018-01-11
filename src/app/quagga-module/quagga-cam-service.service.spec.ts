import { TestBed, inject } from '@angular/core/testing';

import { QuaggaCamService } from './quagga-cam-service.service';

describe('QuaggaCamService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuaggaCamService]
    });
  });

  it('should be created', inject([QuaggaCamService], (service: QuaggaCamService) => {
    expect(service).toBeTruthy();
  }));
});
