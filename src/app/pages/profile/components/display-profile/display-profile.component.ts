import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserOutput } from 'src/app/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderService } from 'src/app/services/order.service';
import { OrderOutput } from 'src/app/models/order.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-display-profile',
  templateUrl: './display-profile.component.html',
  styleUrls: ['./display-profile.component.scss'],
})
export class DisplayProfileComponent implements OnInit {
  appLoading: number = 0;
  userData: UserOutput = new UserOutput();
  orders: OrderOutput[];
  displayedOrders: OrderOutput[];
  pageSize:number = 5;

  constructor(
    private toastService: ToastrService,
    private userService: UserService,
    private orderService: OrderService
  ) {
    userService.getProfile().subscribe(
      (response: UserOutput) => {
        this.appLoading++;
        this.userData = response;
      },
      (error: HttpErrorResponse) => {
        this.toastService.error('Something went wrong', 'Error');
      }
    );

    orderService.getUserOrders().subscribe(
      (response: OrderOutput[]) => {
        this.orders = response;
        this.displayedOrders = this.getOrdersFromPage(1,this.pageSize);
        this.appLoading++;
      },
      (error: HttpErrorResponse) => {
        this.toastService.error('Something went wrong', 'Error');
      }
    );
  }

  ngOnInit(): void {}

  pageChange(event: any): void {
    this.displayedOrders = this.getOrdersFromPage(event.page, event.pageSize);
  }

  getOrdersFromPage(page: number, pageSize: number): OrderOutput[] {   
    return this.orders.slice((page-1) * pageSize, (page-1) * pageSize + pageSize);
  }
}
