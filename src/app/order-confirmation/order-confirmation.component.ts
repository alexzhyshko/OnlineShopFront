import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../service/payment/payment.service';
import { UserService } from '../service/user/user.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OrderDTO } from '../dto/order/OrderDTO';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrl: './order-confirmation.component.css'
})
export class OrderConfirmationComponent implements OnInit {

  orderExternalId?: string;
  order!: OrderDTO;
  orderTotal: number = 0;

  constructor(private userService: UserService, private router: Router, private httpClient: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe((params) => {
        this.orderExternalId = params['orderId']
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${this.userService.getToken()}`
        }); 
        this.httpClient.get<OrderDTO>("http://localhost:8081/checkout/get?orderExternalId=" + this.orderExternalId, { headers: headers }).subscribe(
          data => {
            this.order = data;
            this.orderTotal = this.order.orderEntries!.map(c => c.amount!).reduce((a, c) => a + c, 0);
          },
          error => console.log(error)
        )
      }
      );

  }

}
