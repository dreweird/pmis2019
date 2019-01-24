import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { MFOPhysical } from './mfo';

@Injectable()
export class MfoService {
  constructor(private http: HttpClient) {}

  apiRoot = 'http://localhost:3500';

  getMFO() {
    // let pid = JSON.parse(localStorage.getItem('pid'));
    // let body = {pid: pid};
    const url = `${this.apiRoot}/mfos`;
    return this.http.get(url);
  }

  // export class or interface instead
  getMFOPhysical(): Observable<MFOPhysical[]> {
    const url = `${this.apiRoot}/mfosPhysical`;
    return this.http.get<MFOPhysical[]>(url).pipe(
      tap(_ => console.log('fetched MFO Physical')),
      catchError(this.handleError('getMFOPhysical', []))
    );
  }

  getLogs(): Observable<any> {
    const url = `${this.apiRoot}/getLogs`;
    const uid = JSON.parse(localStorage.getItem('currentUser'));
    const id = uid.user_id;
    return this.http.post<any>(url, { id }).pipe(
      tap(_ => console.log('fetched Logs')),
      catchError(this.handleError('getLogs', []))
    );
  }

  getDistrict(): Observable<any> {
    const url = `${this.apiRoot}/getDistrict`;
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const pid = user.pid;
    return this.http.post<any>(url, { pid }).pipe(
      tap(_ => console.log('fetched District')),
      catchError(this.handleError('getDistrict', []))
    );
  }

  getDistrictDetails(data): Observable<any> {
    const url = `${this.apiRoot}/getDistrictDetails`;
    // const user = JSON.parse(localStorage.getItem('currentUser'));
    // const pid = user.pid;
    return this.http.post<any>(url, { data }).pipe(
      tap(_ => console.log('fetched District Details')),
      catchError(this.handleError('getDistrictDetails', []))
    );
  }

  updateDistrictDetails(data): Observable<any> {
    const url = `${this.apiRoot}/updateDistrictDetails`;
    // const user = JSON.parse(localStorage.getItem('currentUser'));
    // const pid = user.pid;
    return this.http.post<any>(url, { data }).pipe(
      tap(_ => console.log('updated District Details')),
      catchError(this.handleError('updateDistrictDetails', []))
    );
  }
  

  getLastUpdated(): Observable<any> {
    const uid = JSON.parse(localStorage.getItem('currentUser'));
    const id = uid.user_id;
    const url = `${this.apiRoot}/lastUpdated`;
    return this.http.post<any>(url, { id }).pipe(
      tap(_ => console.log('fetched Last Updated')),
      catchError(this.handleError('getLastUpdated', []))
    );
  }

  addObject(mfo_id, object_id) {
    const url = `${this.apiRoot}/addObject`;
    return this.http.post(url, { mfo_id, object_id });
  }

  updateAllotment(id: number, value: number, col: string) {
    const url = `${this.apiRoot}/updateAllotment`;
    return this.http.post(url, { id, value, col });
  }

  updatePhysical(id: number, value: number, col: string): Observable<any> {
    const url = `${this.apiRoot}/updatePhysical`;
    return this.http.post<any>(url, { id, value, col }).pipe(
      tap(_ => console.log('Updated the Physical')),
      catchError(this.handleError('updatePhysical', []))
    );
  }

  updateLogs(
    mfo_id: number,
    value: number,
    uid: number,
    col: string,
    month: string
  ): Observable<any> {
    const url = `${this.apiRoot}/addLogs`;
    const mo = month.slice(0, -1);
    const message = col + ' was updated to ' + value + ' in the month of ' + mo;
    return this.http.post<any>(url, { mfo_id, uid, message }).pipe(
      tap(_ => console.log('Updated the Logs')),
      catchError(this.handleError('addLogs', []))
    );
  }

  getSummaryObject() {
    const url = `${this.apiRoot}/summaryObject`;
    return this.http.get(url);
  }

  getDisbursement() {
    const url = `${this.apiRoot}/disbursement`;
    return this.http.get(url);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
