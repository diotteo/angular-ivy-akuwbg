import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, Observable, of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { DataDocument } from './document';
import { PeriodicElement } from './element';

@Injectable({
    providedIn: 'root'
})
export class DataService {
  constructor(
      private http:HttpClient,
      ) {}

  loadData(): Observable<DataDocument> {
    var data: any = {
      "columns": ["position", "name", "weight", "symbol"],
      "rows": [
        [1, "Hydrogen", 1.0079, "H"],
        [2, "Helium", 4.0026, "He"]
      ]
    };
    return of(data)
        .pipe(
        map((data: any) => {
          var array: PeriodicElement[] = [];
          for (var row of (<any>data).rows) {
            let ele: PeriodicElement = {
              position: row[0],
              name: row[1],
              weight: row[2],
              symbol: row[3],
            };
            array.push(ele);
          }

          return new DataDocument(data.columns, array);
        }));
  }
}
