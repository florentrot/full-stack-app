import {Component, OnInit} from '@angular/core';
import {ShareService} from "../../../../shared/service/ShareService";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{

  constructor(private shareService: ShareService){}
  username: string | undefined = 'Florentin';

  ngOnInit(): void {
    this.shareService.user$.subscribe(userData => {
      this.username = userData?.firstName;
    });
  }

}
