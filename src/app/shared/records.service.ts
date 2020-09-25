import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, switchMap, tap } from 'rxjs/operators';
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
      .post<Record>(`${RecordsService.url}/${dateMoment}.json`, record);
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

  update(record: Record): Observable<Record> {
    const dateMomentLast = moment(record.lastDate).format('MM-DD-YYYY');
    const dateMomemntNew = moment(record.date).format('MM-DD-YYYY');

    const newRecordFront = {
      date: record.date,
      name: record.name,
      id: record.id
    };

    console.log(newRecordFront);

    if (record.date === record.lastDate) { // Дата не менялась
      return this.http
        .patch<Record>(`${RecordsService.url}/${dateMomentLast}/${newRecordFront.id}.json`, newRecordFront);
    } else {
      return this.http
        .delete<Record>(`${RecordsService.url}/${dateMomentLast}/${newRecordFront.id}.json`)
        .pipe(switchMap(() => {
          return this.http.post<Record>(`${RecordsService.url}/${dateMomemntNew}.json`, newRecordFront);
        }));

    }
  }
}
