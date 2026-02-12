import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDatabaseAdd } from './user-database-add';

describe('UserDatabaseAdd', () => {
  let component: UserDatabaseAdd;
  let fixture: ComponentFixture<UserDatabaseAdd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDatabaseAdd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDatabaseAdd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
