import { Component } from '@angular/core';
import { Products } from '../../../data.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private productService: ProductsService) {
    this.productService.getProducts()
  } 
}

