import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../core/service/auth.service";
import { ConfirmDialogService } from "../../shared/service/confirm-dialog.service";
import { NotificationService } from "../../shared/service/notification.service";
import { Constants } from "../../shared/constants";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private router: Router, private authService: AuthService, private confirmDialogService: ConfirmDialogService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated() && !this.authService.isAccountInactive();
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

  openConfirmDialog(): void {
    this.confirmDialogService
      .openConfirmDialog(Constants.CONFIRM_DIALOG, Constants.CONFIRM_LOGOUT)
      .subscribe((result) => {
        if (result) {
          this.logout();
          this.notificationService.displayNotification(Constants.SUCCESSFULLY_LOGGED_OUT, Constants.SUCCESS_STYLE)
        } else {
          console.log('Rejected');
        }
      });
  }
}
