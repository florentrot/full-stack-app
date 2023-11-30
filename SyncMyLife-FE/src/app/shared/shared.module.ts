import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotificationComponent } from './notification/notification.component';
import { SpinnerComponent } from './spinner/spinner.component';



@NgModule({
    declarations:  [
        PageNotFoundComponent,
        NotificationComponent,
        SpinnerComponent
    ],
    exports: [
        NotificationComponent,
        SpinnerComponent
    ],
    imports: [
        CommonModule
    ]
})
export class SharedModule { }
