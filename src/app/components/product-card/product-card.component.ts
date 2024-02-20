import { Component, Input, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Products } from '../../../data.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent implements OnInit {

  @Input() title: string = '';
  @Input() productData: string = '';
  products: Products[] = [];
  allProducts: Products[] = [];
  showQuantityInput = false;
  selectedQuantity = 1; 
  constructor(private productService: ProductsService, private router: Router, private cartService: CartService) { }
  ngOnInit(): void {
    this.getProductData();
    this.getAllProductData()
    // this.displayTotalPrice()
  }

  getProductData() {
    this.productService.getProducts().subscribe((data: any) => {
      this.products = data.products;
    })
  }

  getAllProductData() {
    this.productService.getAllProducts().subscribe((data: any) => {
      this.allProducts = data.products;
    })
  }

  openProductInNewTab(baseUrl: string, id: number) {
    this.router.navigate([`${baseUrl}${id}`]);
  }

  cartItem: Products[] = [];
  
  addToCart(product: Products, quantity: number) {
    // Ensure the quantity is valid (greater than 0)
    if (quantity > 0) {
      product.quantity = quantity;
      this.cartService.addToCart(product);
      console.log(this.cartService.cartItems);
    } else {
      console.error('Invalid quantity selected');
      // You may want to handle the error, display a message, etc.
    } 
  }
  
}

