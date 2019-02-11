import { Component, OnInit } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Store, select } from '@ngrx/store';
import { AppState } from '@app/core';

@Component({
  selector: 'anms-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss']
})
export class AuthenticatedComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  user: any = '';
  pid = 0;
  open: boolean = false;

  setPID(pid: number) {
    this.pid = pid;
  }

  constructor(private storeUser: Store<AppState>) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    if(this.user.pid === 100){
      this.open = true;
    }
  }

  ngOnInit() {}
}
