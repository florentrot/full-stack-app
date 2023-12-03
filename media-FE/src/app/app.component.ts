import {Component, OnInit} from '@angular/core';
import {ShareService} from "./shared/service/ShareService";
import {AuthService} from "./core/service/auth.service";
import {UserService} from "./shared/service/UserService";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'media-FE';

  constructor(private shareService: ShareService,
              private authService: AuthService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.setupSharedData();
  }

  setupSharedData(): void{
    const userEmail = this.authService.getUserData()?.sub;
    if(userEmail && this.authService.isAuthenticated()){
      this.userService.getUserByEmail(userEmail).subscribe(user => {
        this.shareService.setUserData(user);
      });
    }
    else{
      console.log('User is not logged in.');
    }
  }
}
