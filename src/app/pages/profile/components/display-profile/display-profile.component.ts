import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserOutput } from 'src/app/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderService } from 'src/app/services/order.service';
import { OrderOutput } from 'src/app/models/order.model';

@Component({
  selector: 'app-display-profile',
  templateUrl: './display-profile.component.html',
  styleUrls: ['./display-profile.component.scss'],
})
export class DisplayProfileComponent implements OnInit {
  appLoading:number = 0;
  userData: UserOutput = new UserOutput();
  orders: OrderOutput[];

  constructor(private userService: UserService, private orderService: OrderService) {
    userService.getProfile().subscribe(
      (response: UserOutput) => {
        this.appLoading++;
        this.userData = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );

    orderService.getUserOrders().subscribe(
      (response: OrderOutput[]) => {
        this.orders = response;
        this.appLoading++;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        
      }
    );
    
  }

  ngOnInit(): void {}
}
