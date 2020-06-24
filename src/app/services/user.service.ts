import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateUserInput, TokenOutput, UserOutput } from '../models/user.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public AuthenticatedStatus: BehaviorSubject<boolean> = new BehaviorSubject<
    boolean
  >(this.isAuthenticated());

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
      api_key: user.api_key,
    };

    return this.httpClient.post(environment.apiUrl + 'users/logout', body);
  }

  getProfile(): Observable<UserOutput> {
    return this.httpClient.get<UserOutput>(
      environment.apiUrl + 'users/profile'
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

  getApiKey(): string {
    const user = this.getLocalUser();

    if (user) {
      return user.api_key;
    }

    return null;
  }
}
