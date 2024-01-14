import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from "./page/dashboard/dashboard.component";
import { SocialHubComponent } from "./page/social-hub/social-hub.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
  {
    path: 'profile',
    component: DashboardComponent,
  },
  {
    path: 'social-hub',
    component: SocialHubComponent,
  },
  {
    path: '**',
    redirectTo: 'profile',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
