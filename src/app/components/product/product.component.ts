import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Products } from '../../../data.model';
import { ProductsService } from '../../services/products.service';
import { FormControl, FormGroup } from '@angular/forms';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  value!: number;
  productDetails!:Products;
  id!:number;
  // products: Products[] = [];
  // allProducts: Products[] = [];
  // showQuantityInput = false;
  selectedQuantity = 1; 
constructor( private activateRoute: ActivatedRoute, private productService:ProductsService, private cartService: CartService){}
  ngOnInit(): void {
      let productId = this.activateRoute.snapshot.paramMap.get('id');
      productId && this.productService.getProductData(productId).subscribe((data) => {
        // console.log(data);
        this.productDetails = data as Products;;
        console.log(typeof data);
        console.log(this.productDetails);
      })  
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
