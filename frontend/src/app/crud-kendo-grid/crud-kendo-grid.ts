import { Component } from '@angular/core';
import { KENDO_GRID } from '@progress/kendo-angular-grid';

@Component({
  selector: 'app-crud-kendo-grid',
  imports: [KENDO_GRID],
  templateUrl: './crud-kendo-grid.html',
  styleUrl: './crud-kendo-grid.css',
})
export class CrudKendoGrid {
  public gridData = [
    { id: 1, name: 'Product A', price: 100 },
    { id: 2, name: 'Product B', price: 200 }
  ];
}
