import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private userService: UserService;

  constructor(private injector: Injector, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.userService) {
      this.userService = this.injector.get(UserService);
    }
    const user = this.userService.getLocalUser();

    if (user === null) {
      return next.handle(request);
    } else {
      return next.handle(this.addHeaders(request));
    }
  }

  addHeaders(request: HttpRequest<any>) {
    return request.clone({
      headers: request.headers.set(
        'Authorization',
        'Bearer ' + this.userService.getApiKey()
      ),
    });
  }
}
