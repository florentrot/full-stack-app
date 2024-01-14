import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from "./dashboard.routing";
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { PersonCardComponent } from './page/social-hub/person-card/person-card.component';



@NgModule({
    declarations: [
        DashboardComponent,
        PersonCardComponent
    ],
    exports: [
        PersonCardComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
