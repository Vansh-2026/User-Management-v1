import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpBasicInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let username = 'user'
    let password = 'password'
    let basicAuthHeaderString = 'Basic ' + btoa(username + ':' + password);

    request = request.clone({
      setHeaders: { 
        Authorization: basicAuthHeaderString }

    })
    return next.handle(request);
  }
}
