import { TestBed } from '@angular/core/testing';

import { WelcomeDataService } from './welcome-data';

describe('WelcomeData', () => {
  let service:  WelcomeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelcomeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
