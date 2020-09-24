import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Filter, Record } from './shared/interfaces';
import { RecordsService } from './shared/records.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  filter: Filter = {};
  displayedColumns: string[] = ['id', 'name', 'date'];
  dataSource: MatTableDataSource<Record>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  records: Record[];
  allRecords: Record[];

  title = 'angular-filter';

  constructor(private recordsService: RecordsService) { }

  ngOnInit(): void {
    this.recordsService.fetchAll()
      .subscribe(records => {
        this.records = records;
        this.allRecords = records;
        this.dataSource = new MatTableDataSource<Record>(this.records);
        this.dataSource.paginator = this.paginator;
      });

  }

  ngAfterViewInit(): void {

  }

  applyFilter(filter: Filter = {}): void {
    this.filter = filter;

    if (Object.keys(filter).length === 0) {
      this.dataSource.data = this.allRecords;
      return;
    }

    let filteredArray: Record[] = this.records;

    if (filter?.id) {
      filteredArray = filteredArray.slice()
        .filter(item => item.id.trim().toLowerCase().includes(filter.id.trim().toLowerCase()));
    }

    if (filter?.name) {
      filteredArray = filteredArray.slice()
        .filter(item => item.name.trim().toLowerCase().includes(filter.name.trim().toLowerCase()));
    }

    if (filter?.date) {
      filteredArray = filteredArray.slice()
        .filter(item => filter.date.start <= item.date && filter.date.end >= item.date);
    }

    this.dataSource.data = filteredArray;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onSubmitAddRecord(record: Record): void {
    this.records.push(record);
    this.allRecords = this.records;
    this.dataSource.data = this.records;
  }
}
