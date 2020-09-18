import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { range } from 'rxjs';
import { Filter } from '../shared/interfaces';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() filter = new EventEmitter<any>();

  id: number;
  name: string;
  range: FormGroup;
  isValid = true;

  ngOnInit(): void {
    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    });
  }

  validate(): void {
    const date = this.range.value;
    if (!date.start || !date.end) {
      this.isValid = false;
      return;
    }
    this.isValid = date.start < date.end;
  }

  submitFilter(): void {
    const filter: Filter = {};

    if (this.id) {
      filter.id = this.id;
    }

    if (this.name) {
      filter.name = this.name;
    }

    if (this.range.value.date) {
      filter.date = this.range.value;
    }

    this.filter.emit(filter);
  }


}
