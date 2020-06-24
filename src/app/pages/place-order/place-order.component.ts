import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItemOutput } from 'src/app/models/cartItem.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  Validators,
  FormControlName,
} from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { ToastrService } from 'ngx-toastr';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss'],
})
export class PlaceOrderComponent implements OnInit {
  appLoading: number = 0;
  cartItems: CartItemOutput[];
  orderForm: FormGroup;
  orderFormSubmitted: boolean = false;

  constructor(
    private toastService: ToastrService,
    private cartService: CartService,
    private orderService: OrderService,
    private router: Router,
    private titleService: Title
  ) {
    this.titleService.setTitle('New order | Silicon Store');

    this.orderForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      surname: new FormControl(null, [Validators.required]),
      address: new FormControl(null, [Validators.required]),
      city: new FormControl(null, [Validators.required]),
      postal_code: new FormControl(null, [Validators.required]),
      terms: new FormControl(null, [Validators.required]),
    });

    cartService.getCartItems().subscribe(
      (data: CartItemOutput[]) => {
        if (data.length == 0) router.navigate(['/cart']);
        this.cartItems = data;
        this.appLoading++;
      },
      (error: HttpErrorResponse) => {
        this.toastService.error('Something went wrong', 'Error');
      }
    );
  }

  ngOnInit(): void {}

  totalOrderValue(): string {
    let result: number = 0;

    if (this.cartItems.length > 0) {
      this.cartItems.forEach((cartItem) => {
        result += cartItem.amount * cartItem.price;
      });
    }
    return result.toFixed(2);
  }

  onOrderFormSubmit(): void {
    if (this.orderForm.invalid) {
      this.orderFormSubmitted = true;
      return;
    }

    this.orderService
      .createOrder({
        name: this.orderForm.value.name,
        surname: this.orderForm.value.surname,
        address: this.orderForm.value.address,
        city: this.orderForm.value.city,
        postal_code: this.orderForm.value.postal_code,
      })
      .subscribe(
        (data: any) => {
          this.toastService.success('Your order was successfully created!');
          this.router.navigate(['/profile']);
        },
        (error: HttpErrorResponse) => {
          this.toastService.error(error.error.message, 'Error');
        }
      );
  }
}
