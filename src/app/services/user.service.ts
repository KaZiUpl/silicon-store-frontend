import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserInput, TokenOutput } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  register(userInput: CreateUserInput): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'users', userInput);
  }

  login(email: string, password: string): Observable<TokenOutput> {
    const body = {
      email,
      password,
    };
    return this.httpClient.post<TokenOutput>(
      environment.apiUrl + 'users/token',
      body
    );
  }

  logout(): Observable<any> {
    const user = this.getLocalUser();

    const body = {
      token: user.token,
    };

    return this.httpClient.post(environment.apiUrl + 'users/logout', body);
  }

  refreshToken(): Observable<any> {
    const user = this.getLocalUser();
    const body = {
      refresh_token: user.token,
    };
    return this.httpClient.post<TokenOutput>(
      environment.apiUrl + 'token/refresh',
      body
    );
  }

  setLocalUser(user: TokenOutput, remember: boolean): any {
    if (
      remember ||
      (remember === null && window.sessionStorage.getItem('user') === null)
    ) {
      window.localStorage.setItem('user', JSON.stringify(user));
    } else {
      window.sessionStorage.setItem('user', JSON.stringify(user));
    }
  }

  getLocalUser(): TokenOutput {
    if (window.sessionStorage.getItem('user') === null) {
      return JSON.parse(window.localStorage.getItem('user'));
    } else {
      return JSON.parse(window.sessionStorage.getItem('user'));
    }
  }

  removeLocalUser() {
    if (window.sessionStorage.getItem('user') === null) {
      window.localStorage.removeItem('user');
    } else {
      window.sessionStorage.removeItem('user');
    }
  }

  isAuthenticated(): boolean {
    const user = this.getLocalUser();
    return user !== null;
  }

  getToken(): string {
    const user = this.getLocalUser();

    if (user) {
      return user.token;
    }

    return null;
  }
}
