import {Component, ViewChild} from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { RegisterRequestDTO } from "../../../../data/interfaces/RegisterRequestDTO";
import { RegisterService } from "../../../../core/service/register.service";
import {LoadingService} from "../../../../shared/service/loading.service";
import {ErrorNotificationComponent} from "../../../../shared/error-notification/error-notification.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm: FormGroup | any;

  @ViewChild('errorHandler') errorHandler  = new ErrorNotificationComponent;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
    public loadingService: LoadingService,
  ) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  isFormInvalid() {
    return !this.registrationForm.valid;
  }

  onRegister() {
    if (this.registrationForm.valid) {
      const registrationData: RegisterRequestDTO = this.registrationForm.value;
      this.loadingService.show();

      //simulate waiting for response
      setTimeout(() => {
        this.registerService.register(registrationData).subscribe({
          next: (tokenResponse) => {
            if (tokenResponse.token) {
              this.router.navigate(['auth/login']);
              this.loadingService.hide();
            }
          },
          error: (error) => {
            this.errorHandler.displayError(error);
            this.loadingService.hide();
          },
        });
      }, 1500);
    }
  }

}
