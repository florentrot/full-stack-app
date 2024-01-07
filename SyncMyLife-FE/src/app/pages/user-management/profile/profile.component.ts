import {Component, OnInit} from '@angular/core';
import {Role, User} from "../../../data/interfaces/User";
import {UserService} from "../../../shared/service/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{
  user: User;

  constructor(private userService: UserService) {
    this.user = this.getDefaultUserData();
  }

  ngOnInit(): void {
    this.userService.user$.subscribe(response => {
      if(response)
        this.user = response;
    });
  }

  getDefaultUserData(): User{
    return {
      dateOfBirth: "",
      gender: "",
      profilePicture: new Blob(),
      id: -1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'dummy',
      verificationCode: '123456',
      registrationDate: '2022-01-01',
      isActive: true,
      role: Role.USER
    }
  }
}
