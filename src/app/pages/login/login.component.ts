import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserAPIService } from '../../services/user-api.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title: string = "atul"

  username!: string;
  password!: string;
  showPassword: boolean = false;
  data: any = {};

  loginSuccess: boolean = false;

  constructor(private userService: UserAPIService, private toastr: ToastrService, private router: Router) { }

  onUserLogin(formData: NgForm) {
    // console.log(formData.value);
    this.username = '';
    this.password = '';
    this.data = formData.value
    this.userService.getUsersDetail(this.data).subscribe({

      next: (user:any) => {
        if (user) {
          this.userService.setLoginSuccess(true);
          this.toastr.success('Success', 'Logged In!', {
            timeOut: 3000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-center'
          });
  
          this.router.navigate(['/home'])
        } else {
          console.error();
          this.toastr.error('Hello world!', 'Toastr fun!', {
            timeOut: 3000,
            progressBar: true,
            closeButton: true,
            positionClass: 'toast-top-left'
          });
          return;
        }
      },
      error : () => {
        // Error case
        // console.error('Error fetching user data:', error);
        this.toastr.error("sorry to fail", 'Failure', {
          timeOut: 4000,
          progressBar: true,
          closeButton: true,
          positionClass: 'toast-top-left',
        });

      }})
    }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}



// // Retrieve the value from local storage
// const storedLoginSuccess = localStorage.getItem('loginSuccess');

// // Convert the string value back to boolean
// const loginSuccess = storedLoginSuccess ? JSON.parse(storedLoginSuccess) : false;
