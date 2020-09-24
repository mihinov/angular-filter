import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Record } from '../shared/interfaces';

@Component({
  selector: 'app-edit-table',
  templateUrl: './edit-table.component.html',
  styleUrls: ['./edit-table.component.scss']
})
export class EditTableComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  private record: Record;

  ngOnInit(): void {
  }

  openModal(): void {
    const dialogRef = this.dialog.open(DialogPopupComponent, {
      width: '300px',
      data: {
        name: this.record.name,
        date: this.record.date
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      console.log(res);
    });
  }

}

@Component({
  selector: 'app-dialog-popup',
  templateUrl: './dialog-popup.component.html'
})
export class DialogPopupComponent {

  public dialogRef: MatDialogRef<DialogPopupComponent>;
  @Inject(MAT_DIALOG_DATA) public record: Record;

  constructor(dialog: MatDialog) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  deleteRecord(): void {
    console.log('delete Record');
  }

  saveRecord(): void {
    console.log('save Record');
  }
}
