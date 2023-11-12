import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from "./public.routing";
import { HomeComponent } from "./page/home/home.component";
import { MentorsComponent } from './page/mentors/mentors.component';
import { ContactComponent } from './page/contact/contact.component';

@NgModule({
  declarations: [
    HomeComponent,
    MentorsComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
