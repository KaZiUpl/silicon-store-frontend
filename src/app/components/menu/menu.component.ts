import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  navbarOpen: boolean = false;
  isAuth: boolean = false;

  constructor(
    private toastService: ToastrService,
    private userService: UserService,
    private router: Router
  ) {
    //subscribe to auth status to change menu
    userService.AuthenticatedStatus.subscribe((data: any) => {
      this.isAuth = data;
    });
  }

  ngOnInit(): void {}

  logout(): void {
    if (this.userService.isAuthenticated()) {
      this.userService.logout().subscribe(
        (response: any) => {
          this.userService.removeLocalUser();

          this.userService.AuthenticatedStatus.next(false);
          //close menu and change menu links
          this.navbarOpen = false;
          this.router.navigate(['/']);
        },
        (error: HttpErrorResponse) => {
          this.toastService.error(
            'Something went wrong when loading menu',
            'Error'
          );
        }
      );
    }
  }
}
