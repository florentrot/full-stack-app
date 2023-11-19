import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorNotificationComponent } from './error-notification/error-notification.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
    declarations: [
        PageNotFoundComponent,
        ErrorNotificationComponent,
        SpinnerComponent
    ],
    exports: [
        ErrorNotificationComponent,
        SpinnerComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
