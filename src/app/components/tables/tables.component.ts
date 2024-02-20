import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Products } from '../../../data.model';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { loadStripe } from '@stripe/stripe-js';


@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export default class TablesComponent implements OnInit {
  totalCartPrice: number = 0;
  cartItems: Products[] = [];
  productQuantity: number = 1;
  averageDiscount!: number;
  discountAmout: number = 0;
  finalAmount!: number
  constructor(private cartService: CartService, private toastr: ToastrService, private http: HttpClient) { }
  ngOnInit(): void {
    this.cartService.getCart().subscribe((data: any) => {
      this.cartItems = data;
      console.log(data);

      this.totalCartPrice = this.cartService.getTotalPrice();
      this.averageDiscount = this.cartService.averageDiscount();
    })
  }
  removeProduct(product: Products) {
    this.cartService.removeFromCart(product);

  }

  calculateDiscount() {
    if (this.discountAmout === this.averageDiscount) {
      this.finalAmount = Math.trunc((this.totalCartPrice + 7) - (((this.totalCartPrice + 7) * this.averageDiscount) / 100));
      //  console.log(finalAmount);
      this.toastr.success('Discount amount applied', 'woho 🎉', {
        progressBar: true,
        closeButton: true,
      })
    } else {
      this.toastr.warning('please enter the correct average amount', 'Opps', {
        progressBar: true,
        closeButton: true,
      })
      return;
    }
    this.discountAmout = 0;
  }

  isConfirmationVisible = false;

  showConfirmation() {

    if (!this.finalAmount) {
      this.toastr.info("Don't want the discount ?", 'Opps', {
        progressBar: true,
        closeButton: true,
      })
    } else {
      this.cartItems = [];
      this.cartService.removeAllFromCart();
      this.isConfirmationVisible = true;
    }

  }

  hideConfirmation() {
    this.isConfirmationVisible = false;
  }

    result = [{ title: 'Product 1', price: 100, quantity: 1 }]


  checkOut() {
    console.log(this.cartItems)
    this.http.post('http://localhost:4242/checkout', { items: this.cartItems })
    
      .subscribe({
        next: async (data: any) => {

          try {
            const stripe = await loadStripe(
              'pk_test_51OiE7LSCYZfGo6gROxavuR3fgws6huuO8fKrEr37gajLFBEYd2dldBcwiu0ttQV0RmXdcCv2DdzzMNtqa5RYuXYK00JYyGrsFW'
            );

            if (stripe) {
              stripe.redirectToCheckout({ sessionId: data.id });
            } else {
              console.error('Stripe not loaded');
            }
          } catch (error) {
            console.error('Error loading Stripe:', error);
          }
        },
        error: () => {
          console.error('HTTP request error:');
          // Handle error, show user-friendly message, etc.
        }
      });

  }
}
