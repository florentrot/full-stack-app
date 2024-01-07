import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/login/login.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthRoutingModule } from "./auth.routing";
import { RegisterComponent } from './page/register/register.component';
import { AutoCompleteModule } from "primeng/autocomplete";
import { SharedModule } from "../../shared/shared.module";
import { ConfirmRegistrationComponent } from './page/confirm-registration/confirm-registration.component';
import { ProfileComponent } from './page/profile/profile.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ConfirmRegistrationComponent,
    ProfileComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        AutoCompleteModule,
        FormsModule,
        SharedModule,
    ]
})
export class AuthModule { }
