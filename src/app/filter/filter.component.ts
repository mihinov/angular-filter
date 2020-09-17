import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent  {

  id: number;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


}
