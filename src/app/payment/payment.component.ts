import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderService } from '../service/order/order.service';
import { UserService } from '../service/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PaymentService } from '../service/payment/payment.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit{


  paymentForm!: FormGroup;
  paymentRequest: any;
  orderExternalId?: string;

  constructor(private userService: UserService, private router: Router, private paymentService: PaymentService, private route: ActivatedRoute) {
    
  }

  ngOnInit() {
    this.route.params
    .subscribe((params) => {
      console.log(params)
      this.orderExternalId = params['orderId']
    }
    ); 
    this.paymentForm = new FormGroup({
      cardNumber: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      cvv: new FormControl('', [Validators.required])
    })
  }

  pay() {
    
    this.paymentService.pay(
      this.userService.getToken()!,
      this.orderExternalId!, 
      this.paymentForm.get('cardNumber')?.value,
      this.paymentForm.get('date')?.value,
      this.paymentForm.get('cvv')?.value
      ).subscribe(
        data => this.router.navigate(['/order-confirmation', this.orderExternalId]) ,
        error => console.log(error)
      )
  }

}
