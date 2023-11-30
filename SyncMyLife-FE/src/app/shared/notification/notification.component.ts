import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from "../service/notification.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-message-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
  showError: boolean = false;
  notificationStyle: string = '';
  errorMessage: string = '';
  subscription!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.notification$.subscribe(data => {
      this.displayNotification(data.message, data.style);
    });
  }

  displayNotification(message: string, notificationStyle: string): void {
    this.errorMessage = message;
    this.showError = true;
    this.notificationStyle = notificationStyle;
    setTimeout(() => this.showError = false, 3000);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
