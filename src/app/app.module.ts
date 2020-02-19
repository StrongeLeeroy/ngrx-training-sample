import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UsersComponent } from './users/components/users.component';
import { HttpClientModule } from '@angular/common/http';
import { UsersModule } from './users/users.module';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './users/effects/user.effects';
import { StoreModule, ActionReducer, Action, MetaReducer } from '@ngrx/store';
import { reducer, usersFeatureKey } from './users/reducers/user.reducer';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state: any, action: Action) {
    console.log('ACTION DISPATCH --', action.type);
    return reducer(state, action);
  }
}

export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    UsersModule,
    StoreModule.forRoot({
      [usersFeatureKey]: reducer
    }, { metaReducers }),
    
    EffectsModule.forRoot([ UserEffects ])
  ],
  providers: [],
  bootstrap: [UsersComponent]
})
export class AppModule {}
