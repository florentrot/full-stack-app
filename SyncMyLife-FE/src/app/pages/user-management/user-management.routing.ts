import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile/profile.component";

export const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: []
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
export class UserManagementRouting{

}
