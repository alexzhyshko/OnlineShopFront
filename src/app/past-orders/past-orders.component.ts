import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { OrderDTO } from '../dto/order/OrderDTO';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrl: './past-orders.component.css'
})
export class PastOrdersComponent implements OnInit {

  orders?: OrderDTO[];

  constructor(private httpClient: HttpClient, private userService: UserService) { 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });
    this.httpClient.get<OrderDTO[]>("http://localhost:8081/account/orders", {headers: headers}).subscribe(
      data => this.orders = data,
      error => console.log(error)
    )
  }

  ngOnInit() {



  }

}
