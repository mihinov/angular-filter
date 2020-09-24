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
    const dateMoment = moment(record.date).format('MM-DD-YYYY');
    return this.http
      .post<any>(`${RecordsService.url}/${dateMoment}.json`, record);
      // .pipe(map(res => {
      //   console.log('Response:', res);
      //   return {...record, };
      // }));
  }

  fetchByDate(date: Date): Observable<Record[]> {
    const dateMoment = moment(date).format('MM-DD-YYYY');
    return this.http
      .get<Record[]>(`${RecordsService.url}/${dateMoment}.json`)
      .pipe(map(records => {
        if (!records) {
          return [];
        }
        return Object.keys(records).map(key => ({...records[key], id: key}));
      }));
  }

  fetchAll(): Observable<Record[]> {
    return this.http
      .get<Record[]>(`${RecordsService.url}.json`)
      .pipe(map(records => {
        if (!records) {
          return [];
        }

        return Object.values(records).reduce((acc, item) => {
          Object.keys(item).forEach(key => {
            const {date, name} = item[key];
            const id = key;
            acc.push({date: new Date(date), id, name});
          });
          return acc;
        }, []);
      }));
  }
}
