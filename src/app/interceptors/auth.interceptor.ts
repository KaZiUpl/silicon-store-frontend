import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../services/error.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private userService: UserService;
  private errorService: ErrorService;

  constructor(private injector: Injector, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.userService) {
      this.userService = this.injector.get(UserService);
    }
    if (!this.errorService) {
      this.errorService = this.injector.get(ErrorService);
    }
    const user = this.userService.getLocalUser();

    let newRequest;
    if (user === null) {
      newRequest = request;
    } else {
      newRequest = this.addHeaders(request);
    }

    return next.handle(newRequest).pipe(
      catchError((error, caught) => {
        if (error.status == 401) {
          this.userService.removeLocalUser();
          this.userService.AuthenticatedStatus.next(false);
          this.errorService.setErrorAndRedirect({
            code: 401,
            message: 'Seems like you have to sign in.',
          });
        }
        if (error.status == 500) {
          this.errorService.setErrorAndRedirect({
            code: 500,
            message: 'Houston, we have a problem.',
          });
        }
        if (error.status == 403) {
          this.errorService.setErrorAndRedirect({
            code: 403,
            message: "This is forbidden for you. U can't touch this",
          });
        }

        return throwError(error.message || error.statusText);
      })
    );
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
