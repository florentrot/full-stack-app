import {Component, OnInit} from '@angular/core';
import {ShareService} from "../../../../shared/service/share.service";
import {UserDTO} from "../../../../data/interfaces/UserDTO";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  username: any = 'username';
  _user: UserDTO | null = null;

  constructor(private shareService: ShareService) {}

  ngOnInit(): void {
    this.shareService.user$.subscribe(user => {
      this._user = user;
    });
  }

}
