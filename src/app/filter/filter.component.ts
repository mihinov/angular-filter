import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Filter } from '../shared/interfaces';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Output() filter = new EventEmitter<Filter>();

  isValid = true;
  form: FormGroup;

  ngOnInit(): void {
    this.form = new FormGroup({
      start: new FormControl(),
      end: new FormControl(),
      id: new FormControl(),
      name: new FormControl()
    });
  }

  validate(): void {
    const date: {start: Date; end: Date} = this.form.value;

    if (!date?.start && !date?.end) {
      this.isValid = true;
      return;
    }

    if (!date?.start || !date?.end) {
      this.isValid = false;
      return;
    }

    if (!date.start || !date.end) {
      this.isValid = false;
      return;
    }

    this.isValid = date.start <= date.end;
  }

  submitFilter(): void {
    const filter: Filter = {};
    const { id, name, start, end } = this.form.value;
    const date = {start, end};

    if (id) {
      filter.id = id;
    }

    if (name) {
      filter.name = name;
    }

    if (date?.start && date?.end) {
      filter.date = date;
    }

    this.filter.emit(filter);
  }

  resetForm(): void {
    this.form.reset();
    this.filter.emit();
  }

}
