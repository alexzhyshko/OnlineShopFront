import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../service/recommendation/recommendation.service';
import { ProductDTO } from '../dto/product/ProductDTO';
import { Router } from '@angular/router';
import { CartService } from '../service/cart/cart.service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {

  products?: ProductDTO[];

  constructor(private userService: UserService, private recommendationService: RecommendationService,  
    private router: Router, private cartService: CartService) { }

  ngOnInit() {
    this.recommendationService.getRecommendations().subscribe(
      data => this.products = data, 
      error => console.log("Error: "+error))
  }

  addToCart(id: string) {
    if(this.userService.isLoggedIn()) {
      this.cartService.addToCart(id)?.subscribe(data => console.log(data))
    } else {
      this.router.navigate(['login'])
    }
  }

}
