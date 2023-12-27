import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private httpClient: HttpClient) { }

  pay(token: string, orderExternalId: string, cardNumber: string, date: string, cvv: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
      
    });

    return this.httpClient.get("http://localhost:8081/checkout/payment?order=" + orderExternalId + "&cardNumber=" + cardNumber + "&date=" + date + "&cvv=" + cvv,
    {headers: headers, responseType: 'text'})
  }


}
