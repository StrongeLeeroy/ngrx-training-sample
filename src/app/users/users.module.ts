import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { UsersComponent } from './components/users.component';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './effects/user.effects';
import { StoreModule } from '@ngrx/store';
import { reducer as userReducer, usersFeatureKey } from './reducers/user.reducer';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    UsersComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forFeature(usersFeatureKey, userReducer ),
    EffectsModule.forFeature([ UserEffects ])
  ],
  providers: [],
  bootstrap: [UsersComponent]
})
export class UsersModule { }
