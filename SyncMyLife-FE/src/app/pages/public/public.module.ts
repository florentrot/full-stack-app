import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from "./public.routing";
import { HomeComponent } from "./page/home/home.component";
import { SocialHubComponent } from '../dashboard/page/social-hub/social-hub.component';
import { ContactComponent } from './page/contact/contact.component';
import { DashboardModule } from "../dashboard/dashboard.module";

@NgModule({
  declarations: [
    HomeComponent,
    SocialHubComponent,
    ContactComponent
  ],
    imports: [
        CommonModule,
        PublicRoutingModule,
        DashboardModule
    ]
})
export class PublicModule { }
