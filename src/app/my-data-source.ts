import { DataSource, CollectionViewer } from '@angular/cdk/collections';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { DataService } from './data.service';
import { DataDocument } from './document';
import { PeriodicElement } from './element';

export class MyDataSource implements DataSource<PeriodicElement> {
  public columnsSubject = new BehaviorSubject<string[]>([]);
  public dataSubject = new BehaviorSubject<PeriodicElement[]>([]);
  public loadingSubject = new BehaviorSubject<boolean>(false);
  private data: DataService;

  public loading$ = this.loadingSubject.asObservable();

  constructor(
      data: DataService,
      ) {
    this.data = data;
  }

  connect(collectionViewer: CollectionViewer): Observable<PeriodicElement[]> {
    return this.dataSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.columnsSubject.complete();
    this.dataSubject.complete();
    this.loadingSubject.complete();
  }

  loadData() {
    this.data.loadData().pipe(
          catchError(() => of([])),
          finalize(() => this.loadingSubject.next(false))
          )
          .subscribe(doc => {
              this.columnsSubject.next((<DataDocument>doc).columns);
              this.dataSubject.next((<DataDocument>doc).rows);
              });
  }
}
