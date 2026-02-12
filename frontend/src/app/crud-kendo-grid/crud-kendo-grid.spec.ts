import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudKendoGrid } from './crud-kendo-grid';

describe('CrudKendoGrid', () => {
  let component: CrudKendoGrid;
  let fixture: ComponentFixture<CrudKendoGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudKendoGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrudKendoGrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
