import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from "./layout/content-layout/content-layout.component";
import { AuthGuard } from "./core/guard/auth.guard";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  { path: '',
    pathMatch: 'full',
    redirectTo: 'public',
  },
  {
    path: 'public',
    component: ContentLayoutComponent,
    loadChildren: () => import('./pages/public/public.module').then((m) => m.PublicModule),
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'dashboard',
    component: ContentLayoutComponent,
    loadChildren: () => import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'user-management',
    component: ContentLayoutComponent,
    loadChildren: () => import('./pages/user-management/user-management.module').then((m) => m.UserManagementModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'public'
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
