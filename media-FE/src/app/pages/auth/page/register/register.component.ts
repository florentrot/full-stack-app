import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators} from "@angular/forms";
import { AuthService } from "../../../../core/service/auth.service";
import { RegisterRequestDTO } from "../../../../data/interfaces/RegisterRequestDTO";
import { RegisterService } from "../../../../core/service/register.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registrationForm: FormGroup | any;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private registerService: RegisterService,
  ) {
    this.registrationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  isFormInvalid() {
    return !this.registrationForm.valid;
  }

  onRegister() {
    if (this.registrationForm.valid) {
      const registrationData: RegisterRequestDTO = this.registrationForm.value;
      this.registerService.register(registrationData).subscribe({
        next: (tokenResponse) => {
          if (tokenResponse.token) {
            this.router.navigate(['auth/login']);
          }
        },
        error: (error) => {
          console.error('Registration failed:', error);
        },
      });
    }
  }

  // isButtonActive(route: string): boolean {
  //   return this.router.url.includes(route);
  // }

}
