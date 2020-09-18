import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement, Filter } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  filter: Filter = {};
  displayedColumns: string[] = ['id', 'name', 'date'];
  dataSource: MatTableDataSource<PeriodicElement>;

  elementData: PeriodicElement[];

  title = 'angular-filter';

  ngOnInit(): void {
    this.elementData = this.getRemoteData();
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);
  }

  applyFilter(filter: Filter): void {
    this.filter = filter;

    if (Object.keys(filter).length === 0) {
      this.dataSource.data = this.getRemoteData();
      return;
    }

    const filteredArray: PeriodicElement[] = this.elementData.slice()
      .filter((item) => {
        if (
            ( filter.id === item.id ) ||
            ( item.name && item.name?.trim().toLowerCase().includes(filter.name?.trim().toLowerCase())) ||
            ( filter.date.start <= item.date && filter.date.end >= item.date )
          ) {
          return true;
        } else {
          return false;
        }
      });
    this.dataSource.data = filteredArray;
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
      { id: 10, name: 'Neon', date: new Date(2020, 8, 10) }
    ];
  }
}
