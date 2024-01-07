import {NgModule} from "@angular/core";
import {ProfileComponent} from "./profile/profile.component";
import {CommonModule, NgIf} from "@angular/common";
import {UserManagementRouting} from "./user-management.routing";

@NgModule({
  declarations: [
    ProfileComponent
  ],
  imports: [
    NgIf,
    UserManagementRouting,
    CommonModule
  ]
})
export class UserManagementModule{}
