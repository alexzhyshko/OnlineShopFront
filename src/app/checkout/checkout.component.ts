import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartDTO } from '../dto/order/CartDTO';
import { AuthService } from '../service/auth/auth.service';
import { UserService } from '../service/user/user.service';
import { PaymentMode } from '../dto/order/PaymentMode';
import { DeliveryMode } from '../dto/order/DeliveryMode';
import { OrderService } from '../service/order/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit{


  checkoutForm!: FormGroup;
  createOrderRequest: CartDTO;
  useNonDefaultAddress: boolean = true;
  deliveryModeValues: DeliveryMode[] = [DeliveryMode.HOME, DeliveryMode.PICKUP]
  paymentModeValues: PaymentMode[] = [PaymentMode.CASH, PaymentMode.ONLINE]

  constructor(private userService: UserService, private router: Router, private orderService: OrderService) {
    this.createOrderRequest = {
      paymentMode: "CASH",
      deliveryMode: "PICKUP",
      externalId: this.userService.getCurrentUser().cart!.externalId
    };
  }

  ngOnInit() {
    this.checkoutForm = new FormGroup({
      useNonDefaultAddress: new FormControl('NO'),
      streetName: new FormControl(''),
      streetNumber: new FormControl(''),
      streetAdditive: new FormControl(''),
      room: new FormControl(''),
      city: new FormControl(''),
      additionalInfo: new FormControl(''),
      deliveryMode: new FormControl('', [Validators.required]),
      paymentMode: new FormControl('', [Validators.required])
    })
  }

  createOrder() {
    if(this.checkoutForm.get('useNonDefaultAddress')?.value === 'YES') {
      this.createOrderRequest.address = {
        streetName: this.checkoutForm.get('streetName')?.value,
        streetNumber: this.checkoutForm.get('streetNumber')?.value,
        streetAdditive: this.checkoutForm.get('streetAdditive')?.value,
        room: this.checkoutForm.get('room')?.value,
        city: this.checkoutForm.get('city')?.value,
        additionalInfo: this.checkoutForm.get('additionalInfo')?.value,
      }
      console.log(this.createOrderRequest.address)
    }
    this.createOrderRequest.deliveryMode = DeliveryMode[this.checkoutForm.get('deliveryMode')?.value]
    this.createOrderRequest.paymentMode = PaymentMode[this.checkoutForm.get('paymentMode')?.value]

    this.orderService.createOrder(this.userService.getToken()!, this.createOrderRequest).subscribe(
      data => data.paymentMode === "CASH" ? this.router.navigate(['/']) : this.router.navigate(['/payment']),
      error => console.log(error)
    )
    
  }

}
