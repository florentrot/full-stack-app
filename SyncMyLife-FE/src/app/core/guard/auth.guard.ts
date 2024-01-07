import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Router} from '@angular/router';
import {AuthService} from "../service/auth.service";

@Injectable()
export class AuthGuard {
  constructor(public router: Router, private authService: AuthService) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const url: string = route.url.join('/');

    if (this.isNotAuthenticated()) {
      if(this.isNotLoginOrRegister(url)) {
        this.router.navigate(['/public/home']);
        return false;
      }
      if (this.isTryingAuthAccess(url)) {
        return true;
      }
    } else {
      if (this.isInactive()) {
        if(this.isTryingAuthAccess(url)) {
          this.router.navigate(['/auth/confirm-registration']);
          return false;
        }
        if (this.isTryingPrivateAccess(url)) {
          this.router.navigate(['/auth/confirm-registration']);
          return false;
        }
        if (this.isTryingConfirmAccess(url)) {
          return true;
        }
      } else {
        if (this.isTryingAuthOrConfirmAccess(url)) {
          this.router.navigate(['/dashboard/profile']);
          return true;
        }
        return true;
      }
    }
    return false;
  }

  isNotAuthenticated() {
    return !this.authService.isAuthenticated();
  }

  isInactive() {
    return this.authService.isAccountInactive();
  }

  isNotLoginOrRegister(url: string) {
    return !url.includes('login') && !url.includes('register');
  }

  isTryingAuthAccess(url: string) {
    return url.includes('login') || url.includes('register');
  }

  isTryingPrivateAccess(url: string) {
    return url.includes('dashboard' || 'user-management');
  }

  isTryingAuthOrConfirmAccess(url: string) {
    return url.includes('login') || url.includes('register') || url.includes('confirm-registration');
  }

  isTryingConfirmAccess(url: string) {
    return url.includes('confirm-registration');
  }
}
