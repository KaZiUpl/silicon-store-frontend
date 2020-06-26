import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { error } from 'protractor';
import { Router } from '@angular/router';

export class ErrorMessage {
  code: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  errorSubject: BehaviorSubject<ErrorMessage> = new BehaviorSubject<ErrorMessage>({code: 404, message: 'Are you sure you wanted to go here?'});

  constructor(private router: Router) { }

  setErrorAndRedirect(error: ErrorMessage) {
    this.errorSubject.next(error);
    this.router.navigate(['/error']);
  }
}
