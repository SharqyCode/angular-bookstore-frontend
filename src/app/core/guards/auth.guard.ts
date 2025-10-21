import { inject, Injectable } from '@angular/core';
import { CanActivateFn, Router, CanActivate } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('token')) return true;
  else {
    let router = inject(Router);
    router.navigate(['/login']);
    return false;
  }
};

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: any): boolean {
    const expectedRole = route.data['expectedRole'];
    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }

    const decoded: any = jwtDecode(token);
    console.log(decoded);

    if (decoded.role !== expectedRole) {
      this.router.navigate(['/unauthorized']);
      return false;
    }

    return true;
  }
}
