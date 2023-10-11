import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../core/service/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = true;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  // isButtonActive(route: string): boolean {
  //   return this.router.url.includes(route);
  // }

  logout() {
    this.authService.logout();
  }

  isLoggedIn() {
    this.isAuthenticated = localStorage.getItem('token') != undefined;
  }
}
