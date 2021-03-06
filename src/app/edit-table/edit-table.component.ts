import { Component, ElementRef, Inject, Injectable, Input, OnInit, ViewChild, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Record } from '../shared/interfaces';
import { FormGroup, FormControl } from '@angular/forms';
import { RecordsService } from '../shared/records.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  @Input() record: Record;
  @Output() recordEditEmit = new EventEmitter<Record>();

  ngOnInit(): void {
  }

  openModal(): void {
    const data = {
      name: this.record.name,
      date: this.record.date,
      id: this.record.id
    };
    const dialogRef = this.dialog.open(DialogPopupComponent, {
      width: '400px',
      data
    });

    dialogRef.afterClosed().subscribe(record => {
      if (record) {
        this.recordEditEmit.emit(record);
      }
    });
  }

}

@Component({
  selector: 'app-dialog-popup',
  templateUrl: './dialog-popup.component.html'
})
export class DialogPopupComponent implements OnInit, AfterViewInit {

  @ViewChild('name') nameRef: ElementRef<any>;
  form: FormGroup;
  isValid = true;

  constructor(public dialogRef: MatDialogRef<DialogPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public record: Record,
              private recordsService: RecordsService) {}

  ngOnInit(): void {
    this.record.lastName = this.record.name;
    this.record.lastDate = this.record.date;

    this.form = new FormGroup({
      name: new FormControl(this.record.name),
      date: new FormControl(this.record.date)
    });
  }

  ngAfterViewInit(): void {
    // console.log(this.record);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteRecord(): void {
    this.form.disable();
    this.isValid = false;

    this.recordsService.delete(this.record)
      .subscribe(res => {
        this.form.enable();
        this.isValid = true;
        res.deleteBool = true;
        this.dialogRef.close(res);
      });
  }

  onSubmit(): void {
    this.form.disable();
    this.isValid = false;

    this.record.name = this.form.value.name;
    this.record.date = this.form.value.date;
    this.record.lastId = this.record.id;

    this.recordsService.update(this.record)
      .subscribe(record => {
        this.form.enable();
        this.isValid = true;
        this.dialogRef.close(record);
      });
  }

  datePicker(): void {

  }
}
