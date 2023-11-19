import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../core/service/auth.service";
import {AuthenticationRequestDTO} from "../../../../data/interfaces/AuthenticationRequestDTO";
import {RegisterRequestDTO} from "../../../../data/interfaces/RegisterRequestDTO";
import {ErrorNotificationComponent} from "../../../../shared/error-notification/error-notification.component";
import {LoadingService} from "../../../../shared/service/loading.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  errorMessage: string = '';
  loginForm: FormGroup | any;
  currentYear = new Date().getFullYear();
  value: any;

  @ViewChild('errorHandler') errorHandler  = new ErrorNotificationComponent;

  authenticationRequest: AuthenticationRequestDTO | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    public loadingService: LoadingService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    localStorage.clear();
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
            }
          },
          error: (error) => {
            this.errorHandler.displayError('Invalid username/password');
            console.error('Authentication failed:', error);
            this.loadingService.hide();
          },
        });
      }, 1500);

    }
  }
}
