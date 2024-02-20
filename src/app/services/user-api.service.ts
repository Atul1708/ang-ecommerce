import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAPIService {
  private loginSuccess: boolean = false;
  constructor(private http: HttpClient) { }

  getUsersDetail(data: any) {
    return this.http.post('https://dummyjson.com/auth/login', data)
  }
  
  getLoginSuccess(): boolean {
    return this.loginSuccess;
  }

  setLoginSuccess(value: boolean): void {
    console.log('Setting login success:', value);
    this.loginSuccess = value;
    localStorage.setItem('loginSuccess', JSON.stringify(this.loginSuccess));
  }
}
