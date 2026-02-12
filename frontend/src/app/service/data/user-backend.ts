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
  getUserById(id: number) {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
  // addUser(user: User):<User> {
  //   return this.http.post<User>(this.apiUrl);
  // }
  addUser(user: User) {
    return this.http.post<User>(this.apiUrl, user)
  }
  updateUser(id: number, user: User) {
    return this.http.put(`${this.apiUrl}/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

}
