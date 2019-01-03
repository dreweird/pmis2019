import { Component, OnInit } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';
import { getUser } from '@app/core/user/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'anms-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  user$: Observable<any>;

  constructor(private storeUser: Store<AppState>) {
    this.user$ = this.storeUser.pipe(select(getUser));
  }

  ngOnInit() {}
}
