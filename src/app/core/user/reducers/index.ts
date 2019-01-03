import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap
} from '@ngrx/store';
import * as fromRoot from '../../core.state';
import * as fromAuth from './auth.reducer';
import * as fromLoginPage from './login-page.reducer';
import { AuthApiActions } from '../actions';

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
}

export interface State extends fromRoot.AppState {
  user: AuthState;
}

export const reducers: ActionReducerMap<
  AuthState,
  AuthApiActions.AuthApiActionsUnion
> = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer
};

export const selectAuthState = createFeatureSelector<State, AuthState>('user');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);
export const getUser = createSelector(selectAuthStatusState, fromAuth.getUser);
export const getLoggedIn = createSelector(getUser, user => !!user);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);
export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);
export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);
