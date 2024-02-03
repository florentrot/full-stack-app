import {Component, OnInit} from '@angular/core';
import {ShareService} from "./shared/service/share.service";
import {AuthService} from "./core/service/auth.service";
import {DataService} from "./data/data.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'media-FE';

  constructor(private shareService: ShareService,
              private authService: AuthService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.fetchLoggedInUserData();
  }

  fetchLoggedInUserData(): void{
      this.dataService.getUserByEmail().subscribe(user => {
        this.shareService.setUser(user);
      });
  }
}
