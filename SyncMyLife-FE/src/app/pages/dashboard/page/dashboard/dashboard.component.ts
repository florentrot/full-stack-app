import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../shared/service/user.service";
import {User} from "../../../../data/interfaces/User";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  username: any = 'username';
  _user: User | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.user$.subscribe(user => {
      this._user = user;
    });
  }

}
