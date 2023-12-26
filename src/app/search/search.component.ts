import { Component, OnInit } from '@angular/core';
import { ProductDTO } from '../dto/product/ProductDTO';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../service/search/search.service';
import { UserService } from '../service/user/user.service';
import { CartService } from '../service/cart/cart.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  products?: ProductDTO[];
  term?: string;

  constructor(private userService: UserService, private searchService: SearchService, 
    private router: Router, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit() {
    this.route.queryParamMap
      .subscribe((params) => {
        this.term = params.get('term')!
        this.searchService.searchTerm(this.term).subscribe(
          data => {
            this.products = data;
          },
          error => console.log(error)
        )
      }
      ); 
  }

  addToCart(id: string) {
    if(this.userService.isLoggedIn()) {
      this.cartService.addToCart(id)?.subscribe(data => console.log(data))
    } else {
      this.router.navigate(['login'])
    }
  }

}
