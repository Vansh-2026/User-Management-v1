import { TestBed } from '@angular/core/testing';

import { HttpBasicInterceptor } from './httpbasicinterceptor';

describe('Httpbasicinterceptor', () => {
  let service: HttpBasicInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpBasicInterceptor);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
