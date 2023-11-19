import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';



@NgModule({
    declarations: [
        PageNotFoundComponent,
        ErrorNotificationComponent
    ],
    exports: [
        ErrorNotificationComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
