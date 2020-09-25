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
      name: record.name
    };

    if (record.date === record.lastDate) { // Дата не менялась
      return this.http
        .patch<Record>(`${RecordsService.url}/${dateMomentLast}/${record.id}.json`, newRecordFront)
        .pipe(
          map((elem) => {
            elem.id = record.id;
            elem.lastId = record.lastId;
            elem.date = new Date(elem.date);
            return elem;
          })
        );
    } else {
      return this.http
        .delete<Record>(`${RecordsService.url}/${dateMomentLast}/${record.id}.json`)
        .pipe(
          switchMap(() => {
            return this.http
              .post<Record>(`${RecordsService.url}/${dateMomemntNew}.json`, newRecordFront)
              .pipe(
                map((elem) => {
                  const name = elem.name;
                  elem.id = name;
                  elem.name = record.name;
                  elem.lastId = record.lastId;
                  elem.date = record.date;
                  return elem;
                })
              );
          })
        );

    }
  }

  delete(record: Record): Observable<Record> {
    const dateMoment = moment(record.date).format('MM-DD-YYYY');

    return this.http
      .delete<Record>(`${RecordsService.url}/${dateMoment}.json`)
      .pipe(map(item => {
        return record;
      }));
  }
}
