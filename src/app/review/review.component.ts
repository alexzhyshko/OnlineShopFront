import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../service/user/user.service';
import { OrderDTO } from '../dto/order/OrderDTO';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrderEntryDTO } from '../dto/order/OrderEntryDTO';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent implements OnInit {

  orderId?: string;
  orderData?: OrderDTO;
  reviewForm!: FormGroup;
  reviewRequest?: OrderDTO;
  currentEntryIndex: number = 0;


  constructor(private httpClient: HttpClient, private userService: UserService, private router: Router, private route: ActivatedRoute) { 
    this.route.params
    .subscribe((params) => {
      console.log(params)
      this.orderId = params['orderId']
    }
    );

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${this.userService.getToken()}`
  });

  this.httpClient.get<OrderDTO>("http://localhost:8081/review/form?orderExternalId=" + this.orderId, { headers: headers }).subscribe(
    data => {
      this.orderData = data;
      //location.reload
    },
    error => console.log(error)
  )
  }

  
  ngOnInit() {
    this.reviewForm = new FormGroup({
      mark: new FormControl('', [Validators.required]),
      text: new FormControl('')
    })

    
  }

  sendReview() {

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.userService.getToken()}`
    });

    const mark: number = Number(this.reviewForm?.get('mark')!.value)
    const text: string = this.reviewForm?.get('text')!.value
    this.reviewRequest = {
      externalId: this.orderId!,
      orderEntries: [
        {
          externalId: this.orderData!.orderEntries![this.currentEntryIndex].externalId!,
          reviewEntry: {
            externalId: this.orderData!.orderEntries![this.currentEntryIndex].reviewEntry.externalId,
            mark: mark,
            text: text
          }
        }
      ]
    }

    this.httpClient.post("http://localhost:8081/review/add", this.reviewRequest, { headers: headers }).subscribe(
      data => {
        const nextIter = this.currentEntryIndex + 1;
        if(nextIter < this.orderData!.orderEntries!.length) {
          this.currentEntryIndex = nextIter
          this.reviewForm!.reset(this.reviewForm!.value);
        } else {
          console.log("That's it, thanks for your review")
          this.router.navigate(['/']);
        }
      },
      error => console.log(error)
    )
  }

}
