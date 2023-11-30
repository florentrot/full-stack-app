import { Component, OnInit } from '@angular/core';
import { faLinkedin, faFacebook, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Router } from "@angular/router";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear: number = new Date().getFullYear();
  isAuthRoute: boolean = false;

  faLinkedin = faLinkedin;
  faFacebook = faFacebook;
  faYoutube = faYoutube;
  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isAuthRoute = this.isAuthRouteActive();
  }

  isAuthRouteActive(): boolean {
    return !this.router.url.includes('/auth/');
  }

}
