import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-add-person',
  templateUrl: './add-person.component.html',
  styleUrls: ['./add-person.component.scss']
})
export class AddPersonComponent {
  @Input() isAddModeOn: boolean = false;
  imagePath: string = 'assets/profile/mock.jpg';

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

  savePerson() {
    // todo:
  }

}
