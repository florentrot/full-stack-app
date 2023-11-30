import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../core/service/auth.service";

@Component({
  selector: 'app-auth-header',
  templateUrl: './header-auth.component.html',
  styleUrls: ['./header-auth.component.scss']
})
export class HeaderAuthComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }

  isButtonActive(route: string): boolean {
    return this.router.url.includes(route);
  }

  logout() {
    this.isAuthenticated = false;
    this.authService.logout();
  }

}
