import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateCartItemInput,
  UpdateCartItemInput,
  CartItemOutput,
} from '../models/cartItem.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpClient: HttpClient) {}

  getCartItems(): Observable<CartItemOutput[]> {
    return this.httpClient.get<CartItemOutput[]>(environment.apiUrl + 'cart');
  }

  getCartItem(itemId: number): Observable<CartItemOutput> {
    return this.httpClient.get<CartItemOutput>(
      environment.apiUrl + 'cart/' + itemId
    );
  }

  addToCart(cartItem: CreateCartItemInput): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'cart', cartItem);
  }

  modifyCartItem(cartItem: UpdateCartItemInput): Observable<any> {
    return this.httpClient.put(environment.apiUrl + 'cart', cartItem);
  }

  deleteCartItem(cartItemId: number): Observable<any> {
    return this.httpClient.delete(environment.apiUrl + 'cart/' + cartItemId);
  }
}
