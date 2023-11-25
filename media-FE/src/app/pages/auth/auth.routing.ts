import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./page/login/login.component";
import { RegisterComponent } from "./page/register/register.component";
import {ConfirmRegistrationComponent} from "./page/confirm-registration/confirm-registration.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'confirm-registration',
        component: ConfirmRegistrationComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
