import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AuthApiActions } from '../actions';
import * as fromAuth from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<fromAuth.State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      // logged in so return true
      return of(true);
    }

    // not logged in so redirect to login page with the return url
    this.store.dispatch(new AuthApiActions.LoginRedirect());
    return of(false);
  }
}
