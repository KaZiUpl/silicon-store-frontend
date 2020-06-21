import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartItemOutput } from 'src/app/models/cartItem.model';
import { HttpErrorResponse } from '@angular/common/http';
import { fromEvent, Subject, BehaviorSubject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  distinctUntilKeyChanged,
  map,
} from 'rxjs/operators';

@Component({
  selector: 'app-display-cart',
  templateUrl: './display-cart.component.html',
  styleUrls: ['./display-cart.component.scss'],
})
export class DisplayCartComponent implements OnInit {
  appLoading: number = 0;
  cartItems: CartItemOutput[];

  subject: Subject<CartItemOutput> = new Subject<CartItemOutput>();

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

  ngOnInit(): void {
    this.subject
      .pipe(debounceTime(500), distinctUntilKeyChanged('amount'))
      .subscribe((data: CartItemOutput) => {
        this.cartService
          .modifyCartItem({ item_id: data.item_id, amount: data.amount })
          .subscribe(
            (response: any) => {},
            (error: HttpErrorResponse) => {
              console.log(error);
            }
          );
      });
  }

  onDeleteCartItem(cartItem: CartItemOutput): void {
    this.cartService.deleteCartItem(cartItem.item_id).subscribe(
      (response: any) => {
        this.cartItems = this.cartItems.filter(
          (element) => element.item_id != cartItem.item_id
        );
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

  onChange(event: any, cartItem: CartItemOutput) {
    cartItem.amount = parseInt(event.target.value);
    this.subject.next({ ...cartItem, amount: parseInt(event.target.value) });
  }
}
