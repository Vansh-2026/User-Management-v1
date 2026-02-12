import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListDatabase } from './user-list-database';

describe('UserListDatabase', () => {
  let component: UserListDatabase;
  let fixture: ComponentFixture<UserListDatabase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListDatabase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListDatabase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
