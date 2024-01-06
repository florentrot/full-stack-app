import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from "./public.routing";
import { HomeComponent } from "./page/home/home.component";
import { SocialHubComponent } from './page/social-hub/social-hub.component';
import { ContactComponent } from './page/contact/contact.component';

@NgModule({
  declarations: [
    HomeComponent,
    SocialHubComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
