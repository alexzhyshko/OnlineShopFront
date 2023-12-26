import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { ProductDTO } from '../../dto/product/ProductDTO';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private httpClient: HttpClient, private userService: UserService) { }


  searchTerm(term: string) {
    return this.httpClient.get<ProductDTO[]>("http://localhost:8081/search?term=" + term)
  }

  searchCategory(categoryId: string) {
    return this.httpClient.get<ProductDTO[]>("http://localhost:8081/search/" + categoryId)
  }

}
