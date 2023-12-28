import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDTO } from '../dto/product/ProductDTO';
import { CartService } from '../service/cart/cart.service';
import { SearchService } from '../service/search/search.service';
import { UserService } from '../service/user/user.service';
import { CartEntryDTO } from '../dto/order/CartEntryDTO';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {

  cartTotal: number = 0;
  cartEntries: CartEntryDTO[] = [];
  term?: string;

  constructor(private userService: UserService, private searchService: SearchService,
    private router: Router, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    this.cartService.get(this.userService.getToken()!).subscribe(
      data => {
        this.cartEntries = data.cartEntryList!;
        this.cartTotal = this.cartEntries.map(c => c.amount).reduce((a, c) => a + c, 0)
      },
      error => console.log(error)
    );
  }

  removeFromCart(id: string) {
    this.cartService.removeFromCart(id, this.userService.getToken()!).subscribe(data => this.ngOnInit())
  }

  loadCart() {
    this.cartService.get(this.userService.getToken()!).subscribe(
      data => this.cartEntries = data.cartEntryList!,
      error => console.log(error)
    );
  }

  checkout() {
    if(this.cartEntries.length > 0) {
      this.router.navigate(['/checkout'])
    }
  }

}
