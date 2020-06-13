import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderOutput } from '../models/order.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  getUserOrders(): Observable<OrderOutput[]> {
    return this.httpClient.get<OrderOutput[]>(environment.apiUrl+'orders');
  }
}
