import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from "./public.routing";
import { HomeComponent } from "./page/home/home.component";
import { OrganizerComponent } from './page/organizer/organizer.component';
import { ContactComponent } from './page/contact/contact.component';

@NgModule({
  declarations: [
    HomeComponent,
    OrganizerComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
