import { TestBed } from '@angular/core/testing';

import { FacilityServiceService } from './facility-service.service';

describe('FacilityServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FacilityServiceService = TestBed.get(FacilityServiceService);
    expect(service).toBeTruthy();
  });
});
