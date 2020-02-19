import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface User {
  gender: string;
  name: {
    first: string;
    last: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  /** RandomUser REST call */
  public findAllUsers(seed: string, page: number, pageSize: number): Observable<User[]> {
    const url = `https://randomuser.me/api/?seed=${seed}&results=${pageSize}&page=${page}`;
    return this.http.get<{ results: User[] }>(url).pipe(
      map(response => response.results)
    );
  }
}
