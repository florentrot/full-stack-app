import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../core/service/auth.service";
import {UserService} from "../../shared/service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private router: Router,
              private authService: AuthService,
              private userService: UserService) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated() && !this.authService.isAccountInactive();
    this.initialConfiguration();
  }

  initialConfiguration(): void {
    this.userService.fetchLoggedInUserData();
  }

  isButtonActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout() {
    this.isAuthenticated = false;
    this.authService.logout();
  }

  goToLoginPage() {
    if(this.authService.isAuthenticated() && this.authService.isAccountInactive()) {
      this.router.navigate(['/auth/confirm-registration']);
    } else {
      this.router.navigate(['/auth/login']);
    }
  }

  goToRegisterPage() {
    if(this.authService.isAuthenticated() && this.authService.isAccountInactive()) {
      this.router.navigate(['/auth/confirm-registration']);
    } else {
      this.router.navigate(['/auth/register']);
    }
  }

  goToProfilePage(){
    if(this.authService.isAuthenticated()) {
      this.router.navigate(['/auth/profile']);
    } else {
      this.router.navigate(['/public/home']);
    }
  }
}
