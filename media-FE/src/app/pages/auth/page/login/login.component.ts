import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../../core/service/auth.service";
import {AuthenticationRequestDTO} from "../../../../data/interfaces/AuthenticationRequestDTO";
import {RegisterRequestDTO} from "../../../../data/interfaces/RegisterRequestDTO";
import {LoadingService} from "../../../../shared/service/loading.service";
import {Constants} from "../../../../shared/constants";
import {NotificationService} from "../../../../shared/service/notification.service";
import {RegisterService} from "../../../../core/service/register.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  loginForm: FormGroup | any;
  currentYear = new Date().getFullYear();
  authenticationRequest: AuthenticationRequestDTO | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private registerService: RegisterService,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  isFormInvalid() {
    return !this.loginForm.valid;
  }

  onSignIn() {
    if (this.loginForm.valid) {
      const registrationData: RegisterRequestDTO = this.loginForm.value;
      this.loadingService.show();

      //simulate waiting for response
      setTimeout(() => {
        this.authService.login(registrationData).subscribe({
          next: (tokenResponse) => {
            if (tokenResponse.token) {
                this.authService.setSession(tokenResponse);
                this.router.navigate(['dashboard']);
                this.loadingService.hide();
                this.notificationService.displayNotification(Constants.AUTHENTICATED_MSG, Constants.SUCCESS_STYLE);
            }
          },
          error: (error) => {
            this.notificationService.displayNotification(Constants.INVALID_CREDENTIALS_MSG, Constants.ERROR_STYLE);
            console.error('Authentication failed:', error);
            this.loadingService.hide();
          },
        });
      }, 500);
    }
  }
}
