import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDTO } from '../dto/product/ProductDTO';
import { CartService } from '../service/cart/cart.service';
import { SearchService } from '../service/search/search.service';
import { UserService } from '../service/user/user.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  products?: ProductDTO[];
  term?: string;

  constructor(private userService: UserService, private searchService: SearchService,
    private router: Router, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.get(this.userService.getToken()!).subscribe(
      data => this.products = data.cartEntryList.map(x => x.product),
      error => console.log(error)
    );
  }

  removeFromCart(id: string) {
    this.cartService.removeFromCart(id, this.userService.getToken()!).subscribe(data => this.ngOnInit())
  }

  loadCart() {
    this.cartService.get(this.userService.getToken()!).subscribe(
      data => this.products = data.cartEntryList.map(x => x.product),
      error => console.log(error)
    );
  }

}
