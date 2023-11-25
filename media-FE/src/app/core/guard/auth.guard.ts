import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from "../service/auth.service";

@Injectable()
export class AuthGuard {
  constructor(public router: Router, private authService: AuthService) {
  }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}
