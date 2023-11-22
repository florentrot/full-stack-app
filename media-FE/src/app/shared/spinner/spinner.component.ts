import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingService } from "../service/loading.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnDestroy{
  isLoading: boolean = false;
  subscription!: Subscription;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.subscription = this.loadingService.loading$.subscribe(data => {
      this.isLoading = data;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
