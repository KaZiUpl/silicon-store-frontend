import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  navbarOpen: boolean = false;
  isAuth: boolean = false;

  constructor(private userService: UserService, private router: Router) {
    this.isAuth = userService.isAuthenticated();
  }

  ngOnInit(): void {}

  logout(): void {
    if(this.userService.isAuthenticated())
    {      
      this.userService.logout().subscribe(
        (response: any) => {
          this.userService.removeLocalUser();
          this.isAuth = this.userService.isAuthenticated();
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    }

  }
}
