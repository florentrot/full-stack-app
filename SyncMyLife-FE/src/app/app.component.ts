import {Component, OnInit} from '@angular/core';
import {UserService} from "./shared/service/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'media-FE';

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.initialConfiguration();
  }

  initialConfiguration(): void {
    this.userService.fetchLoggedInUserData();
  }
}
