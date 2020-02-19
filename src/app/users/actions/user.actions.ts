import { createAction, props } from '@ngrx/store';

export const setPage = createAction('[Users Page] Set Page Number', props<{ page: number }>());
export const startLoading = createAction('[Users Page] Start Loading');
export const stopLoading = createAction('[Users Page] Stop Loading');
export const setPageSize = createAction('[Users Page] Set Page Size', props<{ pageSize: number }>());
export const setSeed = createAction('[Users Page] Set User Seed', props<{ seed: string }>());
export const togglePageNumberVisibility = createAction('[Users Page] Toggle Page Number Visibility');
export const loadUsers = createAction('[Users Page] Load Users');
export const setFilterText = createAction('[Users Page] Set Filter Text', props<{ filterText: string }>());
