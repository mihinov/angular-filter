import { Component, OnInit } from '@angular/core';
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
  record: FormGroup;

  constructor(private recordsService: RecordsService) { }

  ngOnInit(): void {
    this.record = new FormGroup({
      name: new FormControl(),
      date: new FormControl()
    });

  }

  onSubmit(): void {
    const {name, date} = this.record.value;
    const dateMoment = moment(date).format('MM-DD-YYYY');
    const record = {
      date: dateMoment,
      name
    };
    // console.log(record);

    this.isValid = false;

    const allRecords = this.recordsService.load(date)
      .subscribe(
        res => {
          console.log(res);
        }
      );
    // this.recordsService.create(record)
    //   .subscribe(
    //     (res) => {
    //       console.log(res);
    //       this.isValid = true;
    //     }
    //   );
  }

  validate(): void {
    const {name, date} = this.record.value;

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
