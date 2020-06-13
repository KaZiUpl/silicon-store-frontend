import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CreateUserInput } from 'src/app/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  isPassVisible: boolean = false;
  registerForm: FormGroup;

  constructor(private userService: UserService) {
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
        (response: any) => {},
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }
}
