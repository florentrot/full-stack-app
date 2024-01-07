import {BehaviorSubject} from "rxjs";
import {User} from "../../data/interfaces/User";
import {Injectable} from "@angular/core";
import {AuthService} from "../../core/service/auth.service";
import {DataService} from "../../data/data.service";


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private authService: AuthService,
              private dataService: DataService) {}

  public setUser(user: User){
    this.userSubject.next(user);
  }

  public clearUser(){
    this.userSubject.next(null);
  }

  fetchLoggedInUserData(): void {
    const localUserData = this.authService.gelLocalUserData();
    if(localUserData && localUserData.sub && this.authService.isAuthenticated()){
      this.dataService.getUserByEmail(localUserData.sub).subscribe(user => {
        this.setUser(user);
        console.log(user);
      });
    }
    else {
      console.log('User is not logged in.');
    }
  }
}
