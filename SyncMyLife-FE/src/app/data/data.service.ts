import {HttpClient} from "@angular/common/http";
import {Endpoints} from "./endpoints";
import {User} from "./interfaces/User";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";
import {PersonCardDTO} from "./interfaces/PersonCardDTO";

@Injectable({
  providedIn: 'root'
})
export class DataService{

  constructor(private http: HttpClient) {}

  public getUserByEmail(email: string | undefined): Observable<User>{
    return this.http.get<User>(`${Endpoints.user}/${email}`);
  }

  public getPersons(): Observable<PersonCardDTO[]>{
    return this.http.get<PersonCardDTO[]>(`${Endpoints.socialHub}/persons`)
  }

  savePerson(personCardDTO: PersonCardDTO): Observable<PersonCardDTO> {
    return this.http.post<PersonCardDTO>(`${Endpoints.socialHub}/person`, personCardDTO);
  }
}
