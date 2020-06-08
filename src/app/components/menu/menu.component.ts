import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  navbarOpen: boolean = false;
  isAuth: boolean = false;

  constructor(private userService: UserService) {
    this.isAuth = userService.isAuthenticated();
  }

  ngOnInit(): void {}
}
