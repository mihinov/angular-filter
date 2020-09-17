import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilterComponent } from './filter/filter.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from './shared/classes/MatPaginatorIntlCro';
import { TableComponent } from './filter/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    TableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [{
    provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
