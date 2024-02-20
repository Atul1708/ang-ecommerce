import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserAPIService } from './services/user-api.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserAPIService);
  const router = inject(Router)

  const isLoggedIn = userService.getLoginSuccess();

  if (localStorage.getItem('loginSuccess') ) {
    return true;
  } else {
    // Redirect to the login page if not authenticated
    router.navigate(['/login']);
    return false;
  }
};
