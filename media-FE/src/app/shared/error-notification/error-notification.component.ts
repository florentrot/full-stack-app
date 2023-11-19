import { Component } from '@angular/core';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss']
})
export class ErrorNotificationComponent {
  showError: boolean = true;
  errorMessage: string = '';

  ngOnInit(): void {
    // Subscribe to an error event stream or input from parent component
  }

  // Method to display the error message
  displayError(message: string): void {
    this.errorMessage = message;
    this.showError = true;
    setTimeout(() => this.showError = false, 3000); // Hide after 3 seconds
  }
}
