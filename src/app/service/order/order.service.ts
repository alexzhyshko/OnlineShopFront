import { Injectable } from '@angular/core';
import { CartDTO } from '../../dto/order/CartDTO';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderDTO } from '../../dto/order/OrderDTO';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }

  createOrder(token: string, createOrderRequest: CartDTO) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    
    return this.httpClient.post<OrderDTO>("http://localhost:8081/checkout", createOrderRequest, requestOptions)
  }

}
