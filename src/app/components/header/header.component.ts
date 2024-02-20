import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products } from '../../../data.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  cartItems: Products[] = [];
  cartItemsLength: number = 0;
  constructor(private router:Router, private cartService: CartService){}
  ngOnInit(): void {
    this.cartService.getCart().subscribe(cartItems => {
      this.cartItems = cartItems;
      // console.log(this.cartItems);
      this.updateCartItemsLength()
    });
  }

  updateCartItemsLength(): void {
    this.cartItemsLength = this.cartItems.length;
  }

  logoutUser() {
    localStorage.removeItem('loginSuccess');
    this.router.navigate(['/']);
  }

}
