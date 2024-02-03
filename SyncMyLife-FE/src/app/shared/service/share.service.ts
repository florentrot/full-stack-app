import {BehaviorSubject} from "rxjs";
import {Injectable} from "@angular/core";
import {UserDTO} from "../../data/interfaces/UserDTO";


@Injectable({
  providedIn: 'root'
})
export class ShareService{
  private userSubject: BehaviorSubject<UserDTO | null> = new BehaviorSubject<UserDTO | null>(null);
  public user$ = this.userSubject.asObservable();

  public setUser(user: UserDTO){
    this.userSubject.next(user);
  }

  public clearUser(){
    this.userSubject.next(null);
  }
}
