import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import {filter, switchMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  isRefreshing = false;
  refreshTokenSubject = new BehaviorSubject<string>(null);
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
    }

    if (this.isRefreshing) {
      return this.refreshTokenSubject.pipe(
        filter(result => result !== null),
        take(1),
        switchMap(() => next.handle(this.addHeaders(request))));
    }
    
    //check for expired access token
    
    

    return next.handle(request);
  }

  addHeaders(req: HttpRequest<any>) {
    return req.clone({
      headers: req.headers.set(
        'Authorization',
        'Bearer ' + this.userService.getToken()
      ),
    });
  }
}
