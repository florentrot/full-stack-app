import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit{
  dynamicHeader!: string;
  dynamicMessage!: string;

  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig) {}

  ngOnInit(): void {
    this.dynamicHeader = this.config.data.header;
    this.dynamicMessage = this.config.data.message;
  }

  onConfirm(): void {
    this.ref.close(true);
  }

  onReject(): void {
    this.ref.close(false);
  }

}
