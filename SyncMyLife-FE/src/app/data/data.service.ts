import {HttpClient} from "@angular/common/http";
import {Endpoints} from "./endpoints";
import {User} from "./interfaces/User";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DataService{

  constructor(private http: HttpClient) {}

  public getUserByEmail(email: string): Observable<User>{
    return this.http.get<User>(`${Endpoints.user}/${email}`);
  }
}
