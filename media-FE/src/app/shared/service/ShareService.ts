import {Injectable} from "@angular/core";
import {User} from "../../data/interfaces/User";
import {BehaviorSubject} from "rxjs";
import {Observable} from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class ShareService {
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();

  setUserData(user: User): void{
    this.userSubject.next(user);
  }

  clearUserData(): void {
    this.userSubject.next(null);
  }
}
