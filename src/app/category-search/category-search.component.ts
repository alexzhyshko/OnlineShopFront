import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDTO } from '../dto/product/ProductDTO';
import { SearchService } from '../service/search/search.service';
import { UserService } from '../service/user/user.service';
import { CartService } from '../service/cart/cart.service';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrl: './category-search.component.css'
})
export class CategorySearchComponent implements OnInit {

  products?: ProductDTO[];
  category!: string;

  constructor(private userService: UserService, private searchService: SearchService,
    private router: Router, private route: ActivatedRoute, private cartService: CartService) {
    this.route.params
      .subscribe((params) => {
        console.log(params)
        this.category = params['categoryId']
      }
      );
  }

  ngOnInit() {
    this.searchService.searchCategory(this.category).subscribe(
      data => this.products = data,
      error => console.log(error)
    )
  }

  addToCart(id: string) {
    if (this.userService.isLoggedIn()) {
      this.cartService.addToCart(id)?.subscribe(data => console.log(data))
    } else {
      this.router.navigate(['login'])
    }
  }


}
