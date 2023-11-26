import { Component } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {LoadingService} from "../../../../shared/service/loading.service";
import {NotificationService} from "../../../../shared/service/notification.service";
import {Constants} from "../../../../shared/constants";
import {RegisterService} from "../../../../core/service/register.service";
import {AuthService} from "../../../../core/service/auth.service";

@Component({
  selector: 'app-confirm-registration',
  templateUrl: './confirm-registration.component.html',
  styleUrls: ['./confirm-registration.component.scss']
})
export class ConfirmRegistrationComponent {

  confirmForm: FormGroup | any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private registerService: RegisterService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {
    this.confirmForm = this.formBuilder.group({
      validationCode: ['', [Validators.required]]
    });
  }

  onConfirmAccount() {
    if (this.confirmForm.valid) {
      this.loadingService.show();
      const validationCode = this.confirmForm.get('validationCode').value;
      //simulate waiting for response
      setTimeout(() => {
        this.registerService.confirmEmail(validationCode).subscribe({
          next: (tokenResponse) => {
            if (!tokenResponse.token) {
              this.router.navigate(['auth/confirm-registration']);
              this.loadingService.hide();
            } else {
                this.authService.setSession(tokenResponse);
                this.router.navigate(['dashboard']);
                this.loadingService.hide();
                this.notificationService.displayNotification(Constants.CONFIRM_REGISTRATION_MSG, Constants.SUCCESS_STYLE);
            }
          },
          error: (error) => {
            this.notificationService.displayNotification(error, Constants.ERROR_STYLE);
            this.loadingService.hide();
          },
        });
      }, 500);
    }
  }

  isFormInvalid() {
    return !this.confirmForm.valid;
  }
}
