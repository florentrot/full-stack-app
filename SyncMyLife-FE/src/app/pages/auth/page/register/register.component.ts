import {Component, OnInit} from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { RegisterRequestDTO } from "../../../../data/interfaces/RegisterRequestDTO";
import { RegisterService } from "../../../../core/service/register.service";
import { LoadingService } from "../../../../shared/service/loading.service";
import { Constants } from "../../../../shared/constants";
import { NotificationService } from "../../../../shared/service/notification.service";
import {AuthService} from "../../../../core/service/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{
  registrationForm: FormGroup | any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    private authService: AuthService,
    private loadingService: LoadingService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.formBuilder.group({
      firstName: [
        '',
        Validators.required
      ],
      lastName: [
        '',
        Validators.required
      ],
      email: [
        '',
        [Validators.required, Validators.email]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        ]
      ],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    },
    {
      validator: this.passwordMatchValidator
    });
  }

  isFormInvalid() {
    return !this.registrationForm.valid;
  }

  onRegister() {
    if (this.registrationForm.valid) {
      const registrationData: RegisterRequestDTO = this.registrationForm.value;
      this.loadingService.show();

      this.registerService.register(registrationData).subscribe({
        next: (tokenResponse) => {
          if (tokenResponse.token) {
            this.authService.setSession(tokenResponse);
            this.router.navigate(['auth/confirm-registration']);
            this.loadingService.hide();
            this.notificationService.displayNotification(Constants.REGISTERED_MSG, Constants.SUCCESS_STYLE);
          }
        },
        error: (error) => {
          this.notificationService.displayNotification(error, Constants.ERROR_STYLE);
          this.loadingService.hide();
        },
      });

    }
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ passwordMismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }



}
