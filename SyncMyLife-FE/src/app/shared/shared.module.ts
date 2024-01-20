import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NotificationComponent } from './notification/notification.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { ConfirmDialogService } from "./service/confirm-dialog.service";
import { DialogService } from "primeng/dynamicdialog";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";



@NgModule({
    declarations:  [
        PageNotFoundComponent,
        NotificationComponent,
        SpinnerComponent,
        ConfirmDialogComponent
    ],
    exports: [
        NotificationComponent,
        SpinnerComponent,
    ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
  ],
    providers: [ConfirmDialogService, DialogService]
})
export class SharedModule { }
