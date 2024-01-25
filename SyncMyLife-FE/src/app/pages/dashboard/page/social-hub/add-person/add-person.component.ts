import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PersonCardDTO} from "../../../../../data/interfaces/PersonCardDTO";
import {Constants} from "../../../../../shared/constants";
import {LoadingService} from "../../../../../shared/service/loading.service";
import {DataService} from "../../../../../data/data.service";
import {NotificationService} from "../../../../../shared/service/notification.service";

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent {
  @Input() isAddModeOn: boolean = false;
  @Output() sendNewPerson: EventEmitter<any> = new EventEmitter();
  imagePath: string = 'assets/profile/mock.jpg';
  personForm: FormGroup;
  lastPersonAdded: PersonCardDTO | any;

  constructor(private formBuilder: FormBuilder,
              private loadingService: LoadingService,
              private dataService: DataService,
              private notificationService: NotificationService) {
    this.personForm = this.formBuilder.group({
      name: ['', Validators.required],
      pseudoName: ['', Validators.required],
      birthday: ['', Validators.required],
      details: ['', Validators.required],
      imgUrl: [null, Validators.required],
    });
  }

  handleFileChange(event: any): void {
    const fileInput = event.target;

    if (fileInput.files && fileInput.files[0]) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imagePath = e.target.result;
      };

      reader.readAsDataURL(fileInput.files[0]);
    }
  }

  removePicture() {
    this.personForm.get('imgUrl')?.setValue(null);
    this.imagePath = 'assets/profile/mock.jpg';
  }

  savePerson(): void {
    const personData: PersonCardDTO = this.personForm.value as PersonCardDTO;
    this.loadingService.show();
    this.dataService.savePerson(personData).subscribe({
        next: (data) => {
          this.lastPersonAdded = data;
        },
        error: (error) => {
          console.log(error)
          this.notificationService.displayNotification(Constants.SAVING_PERSONS_ERROR_MSG, Constants.ERROR_STYLE);
        }
      }
    );
    this.loadingService.hide();
    this.clearForm();
    this.sendNewPerson.emit(this.lastPersonAdded);
  }

  clearForm() {
    this.personForm.reset();
    this.imagePath = 'assets/profile/mock.jpg';
  }

  isFormValid(): boolean {
    return this.personForm.valid;
  }

  hasFile(): boolean {
    return this.personForm.get('imgUrl')?.value !== null;
  }

}
