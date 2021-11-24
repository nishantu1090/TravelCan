import { TestBed } from '@angular/core/testing';

import { RideShareService } from './ride-share.service';

describe('RideShareService', () => {
  let service: RideShareService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RideShareService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
