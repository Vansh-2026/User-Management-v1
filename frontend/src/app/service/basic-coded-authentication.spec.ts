import { TestBed } from '@angular/core/testing';

import { BasicCodedAuthentication } from './basic-coded-authentication';

describe('HardCodedAuthentication', () => {
  let service: BasicCodedAuthentication;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BasicCodedAuthentication);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
