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
  image: any;

  constructor(private dataService: DataService,
              private loadingService: LoadingService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.fetchPersonCards();
    // DEMO:
    this.getHubPictures();
  }

  fetchPersonCards(): void {
    this.loadingService.show();
    this.dataService.getPersons().subscribe({
        next: (cards) => {
          this.personCards = cards;
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

  // DEMO:
  getHubPictures(): void {
    this.dataService.getHubPictures().subscribe(data => {
      this.createImageFromBlob(data);
    });
  }

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.image = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }

  addPersonToggle() {
    this.isAddModeOn = !this.isAddModeOn;
    this.btnMessage = this.isAddModeOn ? "Close Form" : "Add Person";
    this.btnStyle = this.isAddModeOn ? "btn-danger" : "btn-success";
  }

  async getLastPersonAdded(event: any) {
    this.notificationService.displayNotification(`${event.name} successfully added`, Constants.SUCCESS_STYLE);
      this.fetchPersonCards();
  }
}
