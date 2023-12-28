import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDTO } from '../dto/product/ProductDTO';
import { CartService } from '../service/cart/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

  productId!: string
  product!: ProductDTO;

  constructor(private httpClient: HttpClient, private userService: UserService,
    private router: Router, private route: ActivatedRoute, private cartService: CartService) {
    this.route.params
      .subscribe((params) => {
        console.log(params)
        this.productId = params['productId']
      }
      );

    this.pullProduct(this.userService.getToken()!).subscribe(
      data => { this.product = data; console.log(this.product); },
      error => error
    );

  }

  ngOnInit() {


  }

  addToCart(id: string) {
    if (this.userService.isLoggedIn()) {
      this.cartService.addToCart(id)?.subscribe(data => console.log(data))
    } else {
      this.router.navigate(['login'])
    }
  }

  pullProduct(token: string) {
    if (token != null) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${this.userService.getToken()}`
      });
      return this.httpClient.get<ProductDTO>("http://localhost:8081/product?productExternalId=" + this.productId, { headers: headers })
    }
    return this.httpClient.get<ProductDTO>("http://localhost:8081/product?productExternalId=" + this.productId)
  }

}

