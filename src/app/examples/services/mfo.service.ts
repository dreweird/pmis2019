import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  addObject(mfo_id, object_id) {
    const url = `${this.apiRoot}/addObject`;
    return this.http.post(url, { mfo_id, object_id });
  }

  getSummaryObject(){
    const url = `${this.apiRoot}/summaryObject`;
    return this.http.get(url);
  }
}
