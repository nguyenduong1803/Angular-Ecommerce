import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

export const authGuard = (route?: ActivatedRouteSnapshot, state?: RouterStateSnapshot) => {
  const router = inject(Router);
  const hasToke = localStorage.getItem('laptop_ecommerce_token');
  const isAdmin = localStorage.getItem('laptop_ecommerce_role');

  return hasToke && isAdmin ? true : router.parseUrl('/auth/login');
};
