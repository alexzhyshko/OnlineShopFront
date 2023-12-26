import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductDTO } from '../../dto/product/ProductDTO';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendationService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }

  getRecommendations() {
    if(this.userService.isLoggedIn()) {
      let auth_token = this.userService.getToken()
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${auth_token}`
      });
      const requestOptions = { headers: headers };
      return this.httpClient.get<ProductDTO[]>("http://localhost:8081/recommendations", requestOptions)
    }
    return this.httpClient.get<ProductDTO[]>("http://localhost:8081/recommendations")
  }
}
