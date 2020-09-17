import { Component } from '@angular/core';
import { PeriodicElement } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  elementData: PeriodicElement[] = [
    { id: 1, name: 'Hydrogen', date: new Date(2020, 9, 1) },
    { id: 2, name: 'Helium', date: new Date(2020, 9, 2) },
    { id: 3, name: 'Lithium', date: new Date(2020, 9, 3) },
    { id: 4, name: 'Beryllium', date: new Date(2020, 9, 4) },
    { id: 5, name: 'Boron', date: new Date(2020, 9, 5) },
    { id: 6, name: 'Carbon', date: new Date(2020, 9, 6) },
    { id: 7, name: 'Nitrogen', date: new Date(2020, 9, 7) },
    { id: 8, name: 'Oxygen', date: new Date(2020, 9, 8) },
    { id: 9, name: 'Fluorine', date: new Date(2020, 9, 9) },
    { id: 10, name: 'Neon', date: new Date(2020, 9, 10) }
  ];

  title = 'angular-filter';
}
