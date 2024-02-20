import { Injectable } from '@angular/core';
import { Products } from '../../data.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() {
    this.loadCartFromLocalStorage();
  }

  cartItems: Products[] = [];

  cartSubject = new BehaviorSubject<Products[]>([]);

  getCart() {
    return this.cartSubject.asObservable();
  }

  addToCart(product: Products) {
    this.cartItems.push(product);
    this.updateCart();
  }

  increaseQuantity(product: Products) {
    const index = this.cartItems.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cartItems[index].quantity += 1;
      this.updateCart();
    }
  }

  loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
      this.updateCart();
    }
  }

  saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, { price }) => total + price, 0);
  }

  averageDiscount() {
    const average = this.cartItems.reduce((total, { discountPercentage }) => (total + discountPercentage / this.cartItems.length), 0);
    // Round the average to two decimal places
    const roundedAverage = parseFloat(average.toFixed(2));
    return roundedAverage;
  }

  removeFromCart(product: Products) {
    const index = this.cartItems.findIndex(item => item.id === product.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateCart();
      this.saveCartToLocalStorage();
    }
  }

  updateCart() {
    this.cartSubject.next([...this.cartItems]);
    this.saveCartToLocalStorage();
  }

  removeAllFromCart() {
    this.cartItems = [];
    this.updateCart();
  }
}


