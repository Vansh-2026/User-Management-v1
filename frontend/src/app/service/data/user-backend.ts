import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../TableSchema';

@Injectable({
  providedIn: 'root',
})

export class UserBackendTs {
  private apiUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.apiUrl);
  }
  // addUser(user: User):<User> {
  //   return this.http.post<User>(this.apiUrl);
  // }
  addUser(user: User) {
    return this.http.post<User>(this.apiUrl, user)
  }


}
