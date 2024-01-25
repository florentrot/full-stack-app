import {Component, OnInit} from '@angular/core';
import {PersonCardDTO} from "../../../../data/interfaces/PersonCardDTO";
import {DataService} from "../../../../data/data.service";
import {Constants} from "../../../../shared/constants";
import {LoadingService} from "../../../../shared/service/loading.service";
import {NotificationService} from "../../../../shared/service/notification.service";

@Component({
  selector: 'app-organizer',
  templateUrl: './social-hub.component.html',
  styleUrls: ['./social-hub.component.scss']
})
export class SocialHubComponent implements OnInit {

  personCards: PersonCardDTO[] = [];
  isAddModeOn: boolean = false;
  btnMessage: any = "Add Person";
  btnStyle: any = "btn-success";

  constructor(private dataService: DataService,
              private loadingService: LoadingService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.fetchPersonCards();
  }

  fetchPersonCards(): void {
    this.loadingService.show();
    this.dataService.getPersons().subscribe({
        next: (data) => {
          this.personCards = data;
          this.loadingService.hide();
        },
        error: (error) => {
          this.notificationService.displayNotification(Constants.FETCHING_PERSONS_ERROR_MSG, Constants.ERROR_STYLE);
          console.error('Error fetching person cards', error);
          this.loadingService.hide();
        }
      }
    );
  }

  addPersonToggle() {
    this.isAddModeOn = !this.isAddModeOn;
    this.btnMessage = this.isAddModeOn ? "Close Form" : "Add Person";
    this.btnStyle = this.isAddModeOn ? "btn-danger" : "btn-success";
  }

  getLastPersonAdded(event: any) {
    // todo: need to solve it just pushing the card to not call again the api
    // this.personCards.push(event);
    this.fetchPersonCards();
  }
}
