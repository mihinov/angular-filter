import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Record } from './interfaces';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  static url = 'https://angular-filter.firebaseio.com/';

  constructor(private http: HttpClient) { }

  create(record: Record): Observable<Record> {
    return this.http
      .post<any>(`${RecordsService.url}/${record.date}.json`, record);
      // .pipe(map(res => {
      //   console.log('Response:', res);
      //   return {...record, };
      // }));
  }

  load(date: Date): Observable<Record[]> {
    const dateMoment = moment(date);
    return this.http
      .get<Record[]>(`${RecordsService.url}/${dateMoment.format('MM-DD-YYYY')}.json`)
      .pipe(map(records => {
        if (!records) {
          return [];
        }
        return Object.keys(records).map(key => ({...records[key], id: key}));
      }));
  }
}
