import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TokenOutput } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isPassVisible: boolean = false;
  loginForm: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      remember: new FormControl(null),
    });
  }

  ngOnInit(): void {}

  onLoginFormSubmit(): void {
    if (this.loginForm.invalid) return;

    this.userService
      .login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe(
        (response: TokenOutput) => {
          this.userService.setLocalUser(
            response,
            this.loginForm.value.remember
          );
          this.userService.AuthenticatedStatus.next(true);
          this.router.navigate(['/index']);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
}
