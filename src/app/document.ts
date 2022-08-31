import { PeriodicElement } from './element';

export class DataDocument {
  columns: string[];
  rows: PeriodicElement[];

  constructor(columns: string[], rows: PeriodicElement[]) {
    this.columns = columns;
    this.rows = rows;
  }
}
