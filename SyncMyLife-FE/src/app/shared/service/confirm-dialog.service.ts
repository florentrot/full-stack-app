import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";
import { Observable } from "rxjs/internal/Observable";
import { DialogService } from "primeng/dynamicdialog";

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {
  constructor(private dialogService: DialogService) {}

  public openConfirmDialog(header: string, message: string): Observable<boolean> {
    const ref = this.dialogService.open(ConfirmDialogComponent, {
      data: { header, message },
      width: '400px',
    });

    return ref.onClose;
  }
}
