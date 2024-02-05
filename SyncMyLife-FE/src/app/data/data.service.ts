import {HttpClient} from "@angular/common/http";
import {Endpoints} from "./endpoints";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";
import {PersonCardDTO} from "./interfaces/PersonCardDTO";
import {UserDTO} from "./interfaces/UserDTO";

@Injectable({
  providedIn: 'root'
})
export class DataService{

  constructor(private http: HttpClient) {}

  public getUserByEmail(): Observable<UserDTO>{
    return this.http.post<UserDTO>(`${Endpoints.user}/userDetails`, null);
  }

  public getPersons(): Observable<PersonCardDTO[]>{
    return this.http.get<PersonCardDTO[]>(`${Endpoints.socialHub}/persons`)
  }

  savePerson(personCardDTO: PersonCardDTO, picture: File): Observable<PersonCardDTO> {
    const formData = new FormData();
    formData.append('personCardDTO', JSON.stringify(personCardDTO));
    formData.append('picture', picture);
    return this.http.post<PersonCardDTO>(`${Endpoints.socialHub}/person`, formData);
  }

  // DEMO:
  getHubPictures(): Observable<any> {
    return this.http.get(`${Endpoints.socialHub}/pictures`, {responseType: 'blob' });
  }
}
