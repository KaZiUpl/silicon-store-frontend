import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { OrderOutput } from 'src/app/models/order.model';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderItemOutput } from 'src/app/models/orderItem.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  appLoading: number = 0;
  order: OrderOutput = new OrderOutput();
  orderItems: OrderItemOutput[];
  orderTotal: number = 0;

  constructor(
    private toastService: ToastrService,
    private orderService: OrderService,
    private route: ActivatedRoute
  ) {
    this.order.id = route.snapshot.params.id;
    this.orderService.getOrder(this.order.id).subscribe(
      (response: OrderOutput) => {
        this.order = response;
        this.appLoading++;
      },
      (error: HttpErrorResponse) => {
        this.toastService.error('Something went wrong', 'Error');
      }
    );
    this.orderService.getOrderItems(this.order.id).subscribe(
      (response: OrderItemOutput[]) => {
        this.orderItems = response;
        this.orderItems.forEach((element) => {
          this.orderTotal += element.amount * element.price;
        });
        this.appLoading++;
      },
      (error: HttpErrorResponse) => {
        this.toastService.error('Something went wrong', 'Error');
      }
    );
  }

  ngOnInit(): void {}
}
