import {Component, Input} from '@angular/core';
import {PersonCardDTO} from "../../../../../data/interfaces/PersonCardDTO";

@Component({
  selector: 'app-person-card',
  templateUrl: './person-card.component.html',
  styleUrls: ['./person-card.component.scss']
})
export class PersonCardComponent {

  @Input() personCard!: PersonCardDTO;

}
