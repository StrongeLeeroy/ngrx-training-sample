import { createReducer, on, createSelector, createFeatureSelector } from '@ngrx/store';
import { User } from '../services/user.service';
import * as UserPageActions from '../actions/user.actions';
import * as UserAPIActions from '../actions/user-api.actions';

export const usersFeatureKey: string = 'users';

export interface UserPageState {
  users: User[];
  page: number;
  pageSize: number;
  pageNumberVisible: boolean;
  seed: string;
  filterText: string;
  pageSizes: number[];
  loading: boolean;
}

export const initialState: UserPageState = {
  users: [],
  page: 0,
  pageSize: 5,
  pageNumberVisible: false,
  seed: '',
  filterText: '',
  pageSizes: [5, 10, 15, 20, 30, 50, 100],
  loading: true
};

export const reducer = createReducer<UserPageState>(
  initialState,
  on(UserPageActions.startLoading, state => ({ ...state, loading: true })),
  on(UserPageActions.stopLoading, state => ({ ...state, loading: false })),
  on(UserPageActions.setPage, (state, { page }) => ({ ...state, page })),
  on(UserPageActions.setPageSize, (state, { pageSize }) => ({ ...state, pageSize })),
  on(UserPageActions.setSeed, (state, { seed }) => ({ ...state, seed })),
  on(UserPageActions.setFilterText, (state, { filterText }) => ({ ...state, filterText })),  
  on(UserPageActions.togglePageNumberVisibility, (state) => {
    const pageNumberVisible = !state.pageNumberVisible;
    return { ...state, pageNumberVisible };
  }),
  on(UserPageActions.loadUsers, (state) => ({ ...state, loading: true })),
  on(UserAPIActions.usersLoaded, (state, { users }) => ({ ...state, loading: false, users }))
);

export const selectUserFeature = createFeatureSelector(usersFeatureKey);

export const selectUsers = createSelector(
  selectUserFeature,
  (state: UserPageState) => state.users
)

export const selectFilterText = createSelector(
  selectUserFeature,
  (state: UserPageState) => state.filterText
)

export const selectVisibleUsers = createSelector(
  selectUsers,
  selectFilterText,
  (users, filterText) => users.filter(({ name }) => `${name.first} ${name.last}`.toLowerCase().includes(filterText.toLowerCase()))
);