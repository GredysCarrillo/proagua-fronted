import { TestBed } from '@angular/core/testing';

import { GeneralServideService } from './general-servide.service';

describe('GeneralServideService', () => {
  let service: GeneralServideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralServideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
