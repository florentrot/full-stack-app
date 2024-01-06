import {BehaviorSubject} from "rxjs";
import {User} from "../../data/interfaces/User";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class ShareService{
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  public setUser(user: User){
    this.userSubject.next(user);
  }

  public clearUser(){
    this.userSubject.next(null);
  }
}
