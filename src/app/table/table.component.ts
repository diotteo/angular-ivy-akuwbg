import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { DataService } from '../data.service';
import { MyDataSource } from '../my-data-source';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  dataSource: MyDataSource;
  displayedColumns: string[] = ["position", "name", "weight", "symbol"];

  constructor(
      private data: DataService,
      private http: HttpClient,
      ) {
    this.dataSource = new MyDataSource(data);
  }

  ngOnInit(): void {
    this.dataSource.loadData();
  }
}
