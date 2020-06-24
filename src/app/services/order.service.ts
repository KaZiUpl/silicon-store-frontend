import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderOutput, CreateOrderInput } from '../models/order.model';
import { environment } from 'src/environments/environment';
import { OrderItemOutput } from '../models/orderItem.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClient: HttpClient) {}

  getUserOrders(): Observable<OrderOutput[]> {
    return this.httpClient.get<OrderOutput[]>(environment.apiUrl + 'orders');
  }

  getOrder(orderId: number): Observable<OrderOutput> {
    return this.httpClient.get<OrderOutput>(
      environment.apiUrl + 'orders/' + orderId
    );
  }

  getOrderItems(orderId: number): Observable<OrderItemOutput[]> {
    return this.httpClient.get<OrderItemOutput[]>(
      environment.apiUrl + 'orders/' + orderId + '/items'
    );
  }

  createOrder(orderInfo: CreateOrderInput): Observable<any> {
    return this.httpClient.post(environment.apiUrl + 'orders', orderInfo);
  }
}
