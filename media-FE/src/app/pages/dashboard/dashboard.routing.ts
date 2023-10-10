import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./page/home/home.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'grid',
    pathMatch: 'full',
  },
  {
    path: 'grid',
    component: HomeComponent,
  },
  {
    path: '**',
    redirectTo: 'grid',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
