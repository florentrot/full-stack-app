import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './page/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AuthRoutingModule } from "./auth.routing";
import { RegisterComponent } from './page/register/register.component';
import { AutoCompleteModule } from "primeng/autocomplete";
import {PasswordModule} from "primeng/password";
import {InputTextModule} from "primeng/inputtext";



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        AutoCompleteModule,
        FormsModule,
        PasswordModule,
        InputTextModule,
    ]
})
export class AuthModule { }
