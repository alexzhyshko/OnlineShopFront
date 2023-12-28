import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { ProductDTO } from '../../dto/product/ProductDTO';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }


  searchTerm(term: string) {
    const token = this.userService.getToken()
    if (token != null) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const requestOptions = { headers: headers };
      return this.httpClient.get<ProductDTO[]>("http://localhost:8081/search?term=" + term, requestOptions)
    }
    return this.httpClient.get<ProductDTO[]>("http://localhost:8081/search?term=" + term)
    
  }

  searchCategory(categoryId: string) {
    const token = this.userService.getToken()
    if (token != null) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      const requestOptions = { headers: headers };
      return this.httpClient.get<ProductDTO[]>("http://localhost:8081/search/" + categoryId, requestOptions)
    }
    return this.httpClient.get<ProductDTO[]>("http://localhost:8081/search/" + categoryId)
  }

}
