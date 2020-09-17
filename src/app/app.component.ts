import { Component } from '@angular/core';
import { PeriodicElement } from './shared/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  elementData: PeriodicElement[] = [
    { id: 1, name: 'Hydrogen', date: 1.0079 },
    { id: 2, name: 'Helium', date: 4.0026 },
    { id: 3, name: 'Lithium', date: 6.941 },
    { id: 4, name: 'Beryllium', date: 9.0122 },
    { id: 5, name: 'Boron', date: 10.811 },
    { id: 6, name: 'Carbon', date: 12.0107 },
    { id: 7, name: 'Nitrogen', date: 14.0067 },
    { id: 8, name: 'Oxygen', date: 15.9994 },
    { id: 9, name: 'Fluorine', date: 18.9984 },
    { id: 10, name: 'Neon', date: 20.1797 }
  ];

  title = 'angular-filter';
}
