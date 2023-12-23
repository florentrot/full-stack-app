import {Component} from '@angular/core';
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
      verificationCode: ['', [Validators.required]]
    });
  }

  onConfirmAccount() {
    if (this.confirmForm.valid) {
      this.loadingService.show();
      const verificationCode = this.confirmForm.get('verificationCode').value;

        this.registerService.confirmEmail(verificationCode).subscribe({
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

    }
  }

  isSubmitButtonDisabled() {
    return !this.confirmForm.valid;
  }

  resendCode() {
    // todo:
    this.notificationService.displayNotification(Constants.CONFIRM_RESEND_VERIFICATION_CODE, Constants.SUCCESS_STYLE);
  }
}
