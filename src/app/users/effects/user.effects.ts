import { Injectable } from '@angular/core';
import { concatMap, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { UserService } from '../services/user.service';
import * as UserPageActions from '../actions/user.actions';
import * as UserAPIActions from '../actions/user-api.actions';
import { of } from 'rxjs';
import { UserPageState, usersFeatureKey } from '../reducers/user.reducer';

@Injectable()
export class UserEffects {


  public loadUsers$ = createEffect(() =>
    this.actions$.pipe(

      ofType(UserPageActions.loadUsers, UserPageActions.setSeed, UserPageActions.setPageSize, UserPageActions.setPage),

      tap(action => this.store.dispatch(UserPageActions.startLoading())),

      concatMap(action => of(action).pipe(
        withLatestFrom(this.store.pipe(select(usersFeatureKey)))
      )),
      
      mergeMap(([ action, userState ]: [any, UserPageState]) => {
        return this.users.findAllUsers(userState.seed, userState.page, userState.pageSize).pipe(
          map(users => UserAPIActions.usersLoaded({ users }))
        );
      })
    )
  );
  

  constructor(private actions$: Actions, private users: UserService, private store: Store<{ [usersFeatureKey: string]: UserPageState }>) {}


}


