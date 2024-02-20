import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Products } from '../../data.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  getProducts() {
    return this.http.get("https://dummyjson.com/products?limit=10")
  }
  getAllProducts() {
    return this.http.get("https://dummyjson.com/products?limit=70")
  }
  getProductData(id: string) {
    return this.http.get<Products>("https://dummyjson.com/products" + `/${id}`)
  }
}
