import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CategoryDTO } from '../../dto/product/CategoryDTO';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  getCategories(token: string) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const requestOptions = { headers: headers };
    return this.httpClient.get<CategoryDTO[]>("http://localhost:8081/category", requestOptions);
  }
}
