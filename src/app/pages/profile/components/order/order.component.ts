import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { OrderOutput } from 'src/app/models/order.model';
import { HttpErrorResponse } from '@angular/common/http';
import { OrderItemOutput } from 'src/app/models/orderItem.model';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';
import { OrderNumberPipe } from 'src/app/pipes/order-number.pipe';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [OrderNumberPipe],
})
export class OrderComponent implements OnInit {
  appLoading: number = 0;
  order: OrderOutput = new OrderOutput();
  orderItems: OrderItemOutput[];

  constructor(
    private toastService: ToastrService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private titleService: Title,
    private orderNumberPipe: OrderNumberPipe
  ) {
    this.order.id = route.snapshot.params.id;
    this.titleService.setTitle(
      'Order no. ' + this.orderNumberPipe.transform(this.order.id, 10) + ' | Silicon Store'
    );
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
        this.appLoading++;
      },
      (error: HttpErrorResponse) => {
        this.toastService.error('Something went wrong', 'Error');
      }
    );
  }

  ngOnInit(): void {}
}
