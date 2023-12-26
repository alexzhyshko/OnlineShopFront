import { Component, OnInit } from '@angular/core';
import { RecommendationService } from '../service/recommendation/recommendation.service';
import { ProductDTO } from '../dto/product/ProductDTO';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent implements OnInit {

  products?: ProductDTO[];

  constructor(private recommendationService: RecommendationService) { }

  ngOnInit() {
    this.recommendationService.getRecommendations().subscribe(
      data => this.products = data, 
      error => console.log("Error: "+error))
  }

}
