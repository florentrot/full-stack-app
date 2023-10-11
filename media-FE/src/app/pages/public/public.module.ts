import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from "./public.routing";
import { HomeComponent } from "./page/home/home.component";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
