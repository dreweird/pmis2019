import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

import { Credentials, User } from '../models/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private BASE_URL = 'http://localhost:3500';

  constructor(private http: HttpClient) {}

  login({ username, password }: Credentials): Observable<User> {
    const url = `${this.BASE_URL}/login`;
    return this.http.post<User>(url, { username, password });
  }

  logout() {
    return of(true);
  }
}
