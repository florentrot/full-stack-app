import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {AuthService} from "../service/auth.service";

@Injectable()
export class AuthGuard {
  constructor(public router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const url: string = route.url.join('/');

    if (!this.authService.isAuthenticated() && !url.includes('login') && !url.includes('register')) {
      this.router.navigate(['/public/home']);
      return false;
    } else if (!this.authService.isAuthenticated() && (url.includes('login') || url.includes('register'))) {
      return true;
    } else if (this.authService.isAuthenticated() && this.authService.isAccountInactive() && (url.includes('login') || url.includes('register'))) {
      this.router.navigate(['/auth/confirm-registration']);
      return false;
    } else if (this.authService.isAuthenticated()) {
      if (url.includes('dashboard')) {
        if (this.authService.isAccountInactive()) {
          this.router.navigate(['/auth/confirm-registration']);
           return true;
        }
      }

      if (!this.authService.isAccountInactive() && (url.includes('login') || url.includes('register') || url.includes('confirm-registration'))) {
        this.router.navigate(['/dashboard/profile']);
        return true;
      }

      if (this.authService.isAccountInactive() && url.includes('confirm-registration')) {
        return true;
      }
    }
    return true;
  }
}
