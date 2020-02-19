import { createAction, props } from '@ngrx/store';
import { User } from '../services/user.service';

export const usersLoaded = createAction('[Users API] Users Loaded Success', props<{ users: User[] }>());
export const usersLoadedError = createAction('[Users API] Users Loaded Error', props<{ users: User[] }>());
