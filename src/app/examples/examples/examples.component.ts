import { Store, select } from '@ngrx/store';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ActivationEnd, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, map } from 'rxjs/operators';
import * as fromAuth from '@app/core/user/reducers';
import { AppState } from '@app/core';

import { routeAnimations, TitleService } from '@app/core';
import {
  State as BaseSettingsState,
  selectSettings,
  SettingsState
} from '@app/settings';

import { State as BaseExamplesState } from '../examples.state';
import { selectAuth } from '@app/core/auth/auth.selectors';
import { getLoggedIn } from '@app/core/user/reducers';

interface State extends BaseSettingsState, BaseExamplesState {}

@Component({
  selector: 'anms-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations]
})
export class ExamplesComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();
  private isAuthenticated$: Observable<boolean>;

  examples = [
    { link: 'todos', label: 'anms.examples.menu.todos' },
    // { link: 'stock-market', label: 'anms.examples.menu.stocks' },
    // { link: 'theming', label: 'anms.examples.menu.theming' },
    // { link: 'crud', label: 'anms.examples.menu.crud' },
    // { link: 'form', label: 'anms.examples.menu.form' },
    { link: 'notifications', label: 'anms.examples.menu.notifications' },
    { link: 'bed1', label: 'BED-1' },
    { link: 'bed2', label: 'BED-2' },
    { link: 'bed3', label: 'BED-3' },
    { link: 'authenticated', label: 'anms.examples.menu.auth', user: true }
  ];

  constructor(
    private store: Store<State>,
    private storeUser: Store<AppState>,
    private router: Router,
    private titleService: TitleService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.translate.setDefaultLang('en');
    this.subscribeToSettings();
    this.subscribeToRouterEvents();
    this.isAuthenticated$ = this.storeUser.pipe(
      select(getLoggedIn),
      map(user => user)
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToSettings() {
    this.store
      .pipe(
        select(selectSettings),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((settings: SettingsState) =>
        this.translate.use(settings.language)
      );
  }

  private subscribeToRouterEvents() {
    this.titleService.setTitle(
      this.router.routerState.snapshot.root,
      this.translate
    );
    this.router.events
      .pipe(
        filter(event => event instanceof ActivationEnd),
        map((event: ActivationEnd) => event.snapshot),
        takeUntil(this.unsubscribe$)
      )
      .subscribe(snapshot =>
        this.titleService.setTitle(snapshot, this.translate)
      );
  }
}
