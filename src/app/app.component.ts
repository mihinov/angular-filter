import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement, Filter } from './shared/interfaces';
import { RecordsService } from './shared/records.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {

  filter: Filter = {};
  displayedColumns: string[] = ['id', 'name', 'date'];
  dataSource: MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  elementData: PeriodicElement[];

  title = 'angular-filter';

  constructor(private recordsService: RecordsService) { }

  ngOnInit(): void {
    this.elementData = this.getRemoteData();
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(filter: Filter): void {
    this.filter = filter;

    if (Object.keys(filter).length === 0) {
      this.dataSource.data = this.getRemoteData();
      return;
    }

    let filteredArray: PeriodicElement[] = this.elementData;

    if (filter?.id) {
      filteredArray = filteredArray.slice()
        .filter(item => filter.id === item.id);
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

  getRemoteData(): PeriodicElement[] {
    return [
      { id: 1, name: 'Hydrogen', date: new Date(2020, 8, 1) },
      { id: 2, name: 'Helium', date: new Date(2020, 8, 2) },
      { id: 3, name: 'Lithium', date: new Date(2020, 8, 3) },
      { id: 4, name: 'Beryllium', date: new Date(2020, 8, 4) },
      { id: 5, name: 'Boron', date: new Date(2020, 8, 5) },
      { id: 6, name: 'Carbon', date: new Date(2020, 8, 6) },
      { id: 7, name: 'Nitrogen', date: new Date(2020, 8, 7) },
      { id: 8, name: 'Oxygen', date: new Date(2020, 8, 8) },
      { id: 9, name: 'Fluorine', date: new Date(2020, 8, 9) },
      { id: 10, name: 'Neon', date: new Date(2020, 8, 10) },
      { id: 1, name: 'Hydrogen', date: new Date(2020, 8, 1) },
      { id: 2, name: 'Helium', date: new Date(2020, 8, 2) },
      { id: 3, name: 'Lithium', date: new Date(2020, 8, 3) },
      { id: 4, name: 'Beryllium', date: new Date(2020, 8, 4) },
      { id: 5, name: 'Boron', date: new Date(2020, 8, 5) },
      { id: 6, name: 'Carbon', date: new Date(2020, 8, 6) },
      { id: 7, name: 'Nitrogen', date: new Date(2020, 8, 7) },
      { id: 8, name: 'Oxygen', date: new Date(2020, 8, 8) },
      { id: 9, name: 'Fluorine', date: new Date(2020, 8, 9) },
      { id: 10, name: 'Neon', date: new Date(2020, 8, 10) }
    ];
  }
}
