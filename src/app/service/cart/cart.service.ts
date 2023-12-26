import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { ProductDTO } from '../../dto/product/ProductDTO';
import { CartDTO } from '../../dto/order/CartDTO';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  addToCart(id: string) {
    if(this.userService.isLoggedIn()) {
      const auth_token = this.userService.getToken()
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      });
      const requestOptions = { headers: headers };
      return this.httpClient.post("http://localhost:8081/cart/add?productExternalId="+id+"&quantity=1", null, requestOptions)
    }
    return null
  }

  get(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.get<CartDTO>("http://localhost:8081/cart", requestOptions)
  }

  removeFromCart(id: string, token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.delete("http://localhost:8081/cart/delete?productExternalId="+id, requestOptions)
  }

}
