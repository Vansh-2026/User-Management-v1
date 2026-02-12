import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User1 } from '../../list-user/list-user';
import { User } from '../../user/user';

// import { Todo } from '../../list-todos/list-todos.component';

@Injectable({
  providedIn: 'root',

})
export class UserData {
  constructor(private http: HttpClient) {

  }

  retrieveAllTodos(name: string) {
    return this.http.get<User1[]>(`http://localhost:8080/user/${name}/user`)


  }
  deleteTodo(username: string, id: number) {
    return this.http.delete(`http://localhost:8080/user/${username}/user/${id}`);
  }
  retreiveTodo(username: string, id: number) {
    return this.http.get<User1>(`http://localhost:8080/user/${username}/user/${id}`);
  }

  updateTodo(username: string,id:number, todo: User1) {
    return this.http.put(`http://localhost:8080/user/${username}/user/${id}`,todo);
  }
  createTodo(username: string, todo: User1) {
    return this.http.post(`http://localhost:8080/user/Het/user`,todo);
  }


}
