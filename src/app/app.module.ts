import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlCro } from './shared/classes/MatPaginatorIntlCro';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AppComponent } from './app.component';
import { FilterComponent } from './filter/filter.component';
import { EditTableComponent, DialogPopupComponent } from './edit-table/edit-table.component';
import { FormAddRecordComponent } from './form-add-record/form-add-record.component';

@NgModule({
  declarations: [
    AppComponent,
    FilterComponent,
    EditTableComponent,
    DialogPopupComponent,
    FormAddRecordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    HttpClientModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [{
    provide: MatPaginatorIntl, useClass: MatPaginatorIntlCro
  }],
  entryComponents: [DialogPopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
