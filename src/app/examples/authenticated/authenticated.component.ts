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
  name: string = '';
  open: boolean = false;
  uid: any;

  setPID(pid: number, name: string) {
    this.pid = pid;
    this.name = name;
  }

  constructor(private storeUser: Store<AppState>) {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.uid = this.user.user_id;
    if(this.user.pid === 100 || this.user.pid === 101 ){
      this.open = true;
    }
  }

  ngOnInit() {}
}
