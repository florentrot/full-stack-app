import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContentLayoutComponent } from "./layout/content-layout/content-layout.component";
import { AuthGuard } from "./core/guard/auth.guard";
import { AuthLayoutComponent } from "./layout/auth-layout/auth-layout.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
        import('./pages/dashboard/dashboard.module').then(x => x.DashboardModule)
      },
    ],
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./pages/auth/auth.module').then(x => x.AuthModule)
  },
  // {
  //   path: '**',
  //   component: AuthLayoutComponent,
  //   loadChildren: () =>
  //     import('./pages/auth/auth.module').then(x => x.AuthModule)
  // },
   // {path: '**', redirectTo: '/auth/login', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
