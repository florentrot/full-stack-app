import { Component, OnInit } from '@angular/core';
import {faLinkedin, faFacebook, faYoutube} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  faLinkedin = faLinkedin;
  faFacebook = faFacebook;
  faYoutube = faYoutube;
  constructor() { }

  ngOnInit(): void {
  }

}
