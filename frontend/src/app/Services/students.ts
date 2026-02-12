import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { student } from '../Interface/student';

@Injectable({
  providedIn: 'root',
})
export class Students {
  url = "http://localhost:3000/students";
  constructor(private http: HttpClient) {

  }
  getStudent(): Observable<student[]> {

    return this.http.get<student[]>(this.url);

  }
  saveStudent(student: student): Observable<student> {

    return this.http.post<student>(this.url, student);

  }
  deleteStudent(id: string): Observable<student> {
    return this.http.delete<student>(this.url + "/" + id);
  }
  getSelectedStudent(id:string): Observable<student> {

    return this.http.get<student>(this.url + "/" + id);

  }
   updateStudent(student1:student): Observable<student> {

    return this.http.put<student>(this.url + "/" +student1.id,student1);

  }
}
