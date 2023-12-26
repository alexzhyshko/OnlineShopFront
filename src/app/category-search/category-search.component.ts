import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductDTO } from '../dto/product/ProductDTO';
import { SearchService } from '../service/search/search.service';

@Component({
  selector: 'app-category-search',
  templateUrl: './category-search.component.html',
  styleUrl: './category-search.component.css'
})
export class CategorySearchComponent implements OnInit{

  products?: ProductDTO[];
  category?: string;

  constructor(private searchService: SearchService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(){
    this.route.queryParamMap
    .subscribe((params) => {
      this.category = params.get('category')!
      this.searchService.searchTerm(this.category).subscribe(
        data => this.products = data,
        error => console.log(error)
      )
    }
    ); 
  }

  search(page: number) {
    this.searchService.searchCategory(this.category!).subscribe(
      data => this.products = data,
      error => console.log(error)
    )
  }

  
}
