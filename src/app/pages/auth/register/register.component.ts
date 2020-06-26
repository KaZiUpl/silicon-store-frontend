import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateUserInput, TokenOutput } from 'src/app/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isPassVisible: boolean = false;
  registerForm: FormGroup;

  constructor(
    private toastService: ToastrService,
    private userService: UserService,
    private router: Router,
    private titleService: Title
  ) {
    titleService.setTitle('Sign up | Silicon Store');

    //redirect logged in users to profile page
    if (userService.getLocalUser() != null) {
      router.navigate(['/profile']);
    }

    this.registerForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      nick: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onRegisterFormSubmit(): void {
    if (this.registerForm.invalid) return;

    this.userService
      .register({
        email: this.registerForm.value.email,
        name: this.registerForm.value.nick,
        password: this.registerForm.value.password,
      })
      .subscribe(
        (response: any) => {
          //log in after successful register
          this.userService
            .login(
              this.registerForm.value.email,
              this.registerForm.value.password
            )
            .subscribe(
              (response: TokenOutput) => {
                this.userService.setLocalUser(response, false);
                this.userService.AuthenticatedStatus.next(true);
                this.router.navigate(['/index']);
              },
              (error: HttpErrorResponse) => {
                if (error.status == 400) {
                  this.toastService.error(error.error.message, 'Error');
                } else {
                  this.toastService.error('Something went wrong', 'Error');
                }
              }
            );
        },
        (error: HttpErrorResponse) => {
          if (error.status == 400) {
            this.toastService.error(error.error.message, 'Oh no!');
          } else {
            this.toastService.error('Something went wrong', 'Error');
          }
        }
      );
  }
}
