import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../../core/service/auth.service";
import {AuthenticationRequestDTO} from "../../../../data/interfaces/AuthenticationRequestDTO";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;
  showAlertMessage: boolean = false;
  usernameIsEmpty: boolean = false;
  passwordIsEmpty: boolean = false;
  loading: boolean = false;
  errorMessage: string | undefined;
  loginForm: FormGroup | any;
  currentYear = new Date().getFullYear();

  authenticationRequest: AuthenticationRequestDTO | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit(): void {
    localStorage.clear();
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  // onSubmit() {
  //   this.submitted = true;
  //   this.showAlertMessage = false;
  //   this.checkForValidationErrors();
  //
  //   if (this.loginForm.invalid) {
  //     this.showAlertMessage = true;
  //     this.loading = false;
  //     setTimeout(() => {
  //       this.showAlertMessage = false;
  //       this.usernameIsEmpty = false;
  //       this.passwordIsEmpty = false;
  //     }, 3000);
  //   }
  //
  //   this.loading = true;
  //   const username = this.loginForm.get('username').value;
  //   const password = this.loginForm.get('password').value;
  //
  //   this.getTokenAuth(username, password);
  // }

  // private getTokenAuth(username: string, password: string) {
  //   this.loading = true;
  //   this.authService.getToken(username, password).subscribe({
  //     next: (tokenResponse) => {
  //       if (tokenResponse.token && tokenResponse.apiKey) {
  //         this.authService.setSession(tokenResponse);
  //         this.router.navigate(['dashboard']);
  //       }
  //     },
  //     error: (error) => {
  //       console.log(error.message);
  //       this.errorMessage = 'Authentication failed';
  //       this.showAlertMessage = true;
  //       this.loading = false;
  //       setTimeout(() => {
  //         this.showAlertMessage = false;
  //       }, 4000)
  //     },
  //   });
  // }

  // checkForValidationErrors() {
  //   this.errorMessage = '';
  //   const {username, password} = this.loginForm?.controls;
  //
  //   if (username?.errors?.required && password?.errors?.required) {
  //     this.usernameIsEmpty = true;
  //     this.passwordIsEmpty = true;
  //     this.errorMessage = 'Username and password are required';
  //   } else {
  //     if (username?.errors?.required) {
  //       this.usernameIsEmpty = true;
  //       this.errorMessage = 'Username is required';
  //     }
  //     if (password?.errors?.required) {
  //       this.passwordIsEmpty = true;
  //       this.errorMessage = 'Password is required';
  //     }
  //   }
  // }
  value: any;

  isButtonActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  onSubmit() {
    this.loading = true;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    this.login(email, password);
  }


  private login(username: string, password: string) {

    this.authService.getToken(username, password).subscribe({
      next: (tokenResponse) => {
        if (tokenResponse.token) {
          this.authService.setSession(tokenResponse);
          this.router.navigate(['dashboard']);
        }
      },
      error: (error) => {

      },
    });
  }

}
