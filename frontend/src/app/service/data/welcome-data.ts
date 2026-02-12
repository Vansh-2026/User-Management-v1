import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class HelloWorldBean {
  constructor(public message: string) { }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(
    private http: HttpClient
  ) { }

  executeHelloWorldBeanService() {
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean');
    //console.log("Execute Hello World Bean Service")
  }


  executeHelloWorldServiceWithPathVariable(name:String) {
    let basicHeaderString = this.createBasicAuthenticationHttpHeader();

    let headers = new HttpHeaders({
      Authorization: basicHeaderString
    })

    return this.http.get<HelloWorldBean>(
      `http://localhost:8080/hello-world-bean/path-variable/${name}`,
      { headers:headers }
    );
    //console.log("Execute Hello World Bean Service")
  }

  createBasicAuthenticationHttpHeader() {
    let username = 'user'
    let password = 'password'
    let basicAuthHeaderString = 'Basic ' + btoa(username + ':' + password);
    return basicAuthHeaderString;
  }

}