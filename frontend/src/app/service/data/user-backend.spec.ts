import { TestBed } from '@angular/core/testing';

import { UserBackendTs } from './user-backend.js';

describe('UserBackendTs', () => {
  let service: UserBackendTs;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserBackendTs);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
