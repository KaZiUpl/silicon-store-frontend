import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ErrorService, ErrorMessage } from 'src/app/services/error.service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  errorCode: number = 404;
  errorMessage: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private errorService: ErrorService
  ) {
    this.activatedRoute.data.subscribe((data) => {
      this.errorCode = data.code;
      this.errorMessage = data.message;
    });
  }

  ngOnInit(): void {
    this.errorService.errorSubject.subscribe((data: ErrorMessage) => {
      (this.errorCode = data.code), (this.errorMessage = data.message);
    });
  }
}
