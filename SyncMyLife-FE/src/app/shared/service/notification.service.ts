import { Injectable } from '@angular/core';
import { Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSource = new Subject<{ message: string, style: string }>();
  notification$ = this.notificationSource.asObservable();

  displayNotification(message: string, style: string) {
    this.notificationSource.next({ message, style });
  }
}
