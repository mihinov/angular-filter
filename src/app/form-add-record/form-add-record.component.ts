import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RecordsService } from '../shared/records.service';
import { Record } from '../shared/interfaces';
import * as moment from 'moment';

@Component({
  selector: 'app-form-add-record',
  templateUrl: './form-add-record.component.html',
  styleUrls: ['./form-add-record.component.scss']
})
export class FormAddRecordComponent implements OnInit {

  isValid = false;
  form: FormGroup;

  @Output() submitEmit = new EventEmitter<any>();

  constructor(private recordsService: RecordsService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(),
      date: new FormControl()
    });

  }

  onSubmit(): void {
    const {name, date} = this.form.value;
    const record = {name, date};

    this.form.disable();
    this.isValid = false;

    this.recordsService.create(record)
      .subscribe(
        (res) => {
          const newRecord: Record = {
            name: record.name,
            date: record.date,
            id: res.name
          };

          this.form.reset();
          this.form.enable();
          this.isValid = false;

          this.submitEmit.emit(newRecord);
        }
      );
  }

  validate(): void {
    const {name, date} = this.form.value;

    if (!name || !date) {
      this.isValid = false;
      return;
    }

    if (name && date) {
      this.isValid = true;
      return;
    }
  }

}
