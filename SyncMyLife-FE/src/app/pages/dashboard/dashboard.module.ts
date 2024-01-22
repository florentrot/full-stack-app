import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from "./dashboard.routing";
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { PersonCardComponent } from './page/social-hub/person-card/person-card.component';
import { AddPersonComponent } from './page/social-hub/add-person/add-person.component';



@NgModule({
    declarations: [
        DashboardComponent,
        PersonCardComponent,
        AddPersonComponent
    ],
    exports: [
        PersonCardComponent,
        AddPersonComponent
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule
    ]
})
export class DashboardModule { }
