import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserPageState, usersFeatureKey, selectVisibleUsers } from '../reducers/user.reducer';
import { loadUsers, setPageSize, setSeed, togglePageNumberVisibility, setFilterText } from '../actions/user.actions';
import { debounceTime, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit, OnDestroy {

  public state$: Observable<UserPageState> = this.store.pipe(select(usersFeatureKey));
  
  public visibleUsers$ = this.store.pipe(select(selectVisibleUsers));

  public seedText: FormControl = new FormControl();
  private seedTextSubscription: Subscription;

  public filterText: FormControl = new FormControl();
  private filterTextSubscription: Subscription;

  constructor(public store: Store<{ [usersFeatureKey: string]: UserPageState }>) {}

  ngOnInit() {
    this.store.dispatch(loadUsers());

    this.seedTextSubscription = this.seedText.valueChanges
      .pipe(debounceTime(500))
      .subscribe(value => this.store.dispatch(setSeed({ seed: value })));

    this.filterTextSubscription = this.filterText.valueChanges
      .subscribe(value => this.store.dispatch(setFilterText({ filterText: value })));
  }

  ngOnDestroy() {
    this.seedTextSubscription.unsubscribe();
    this.filterTextSubscription.unsubscribe();
  }

  setPageSize(pageSize: number) {
    this.store.dispatch(setPageSize({ pageSize }));
  }

  togglePageNumberVisibility() {
    this.store.dispatch(togglePageNumberVisibility());
  }
}
