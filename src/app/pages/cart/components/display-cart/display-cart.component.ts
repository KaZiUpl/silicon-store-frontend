import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItemOutput } from 'src/app/models/cartItem.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-display-cart',
  templateUrl: './display-cart.component.html',
  styleUrls: ['./display-cart.component.scss'],
})
export class DisplayCartComponent implements OnInit {
  appLoading: number = 0;
  cartItems: CartItemOutput[];

  constructor(private cartService: CartService) {
    cartService.getCartItems().subscribe(
      (response: CartItemOutput[]) => {
        this.cartItems = response;
        this.appLoading++;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {}

  onDeleteCartItem(itemId: number): void {
    this.cartService.deleteCartItem(itemId).subscribe(
      (response: any) => {
        //TODO: modify cartItems and deleted deleted cartItem
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  totalOrderValue(): string {
    let result: number = 0;

    if (this.cartItems.length > 0) {
      this.cartItems.forEach((cartItem) => {
        result += cartItem.amount * cartItem.price;
      });
    }
    return result.toFixed(2);
  }
}
