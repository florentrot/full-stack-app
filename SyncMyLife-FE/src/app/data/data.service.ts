import {HttpClient} from "@angular/common/http";
import {Endpoints} from "./endpoints";
import {User} from "./interfaces/User";
import {Observable} from "rxjs/internal/Observable";
import {Injectable} from "@angular/core";
import {PersonCardDTO} from "./interfaces/PersonCardDTO";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService{

  constructor(private http: HttpClient) {}

  public getUserByEmail(email: string | undefined): Observable<User>{
    return this.http.get<User>(`${Endpoints.user}/${email}`);
  }

  // todo: backend side
  // public getPersons(): Observable<PersonCardDTO[]>{
  //   return this.http.get<PersonCardDTO[]>(`${Endpoints.socialHub}`)
  // }

  getPersons(): Observable<PersonCardDTO[]> {
    const mockData: PersonCardDTO[] = [
      {
        imgURL: '../../../../../assets/social/social_1.jpg',
        name: 'Pikachu (Mom)',
        birthday: new Date('1990-01-01'),
        details: 'Our relaxation specialist teaches you to take life as it comes, not to panic, and to be chill all the time. He is very good at therapy through smiling and giggling. He has the power to hypnotize you with his cuteness.',
      },
      {
        imgURL: '../../../../../assets/social/social_2.jpg',
        name: 'Homer Simpson (Dad)',
        birthday: new Date('1985-05-15'),
        details: 'Our OCD specialist helps you use this syndrome to your advantage. Anxiety will no longer be a problem. We will eliminate it in the meantime without losing the positive aspect of perfectionism.',
      },
      {
        imgURL: '../../../../../assets/social/social_3.jpg',
        name: 'Stewie Griffin (Brother)',
        birthday: new Date('1980-07-29'),
        details: 'Our happiness specialist knows how to make you smile even when you are tired, upset, or depressed. He is also a great companion for mountain trips.',
      },
      {
        imgURL: '../../../../../assets/social/social_4.jpg',
        name: 'Dexter (Son)',
        birthday: new Date('1982-05-14'),
        details: 'Our specialist in Risk issues will help you not to be afraid to take risks, and to do so by analyzing whether that risk is worth taking or not. You will step out of your comfort zone and live life with more courage.',
      },
    ];

    return of(mockData);
  }
}
