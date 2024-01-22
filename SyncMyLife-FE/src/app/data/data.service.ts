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
        details: 'Our amazing mom who always brings warmth and comfort to the family. She is the heart of our home, a master of delicious meals, and a pro at soothing away any troubles. Her love is the guiding light that keeps our family together.',
      },
      {
        imgURL: '../../../../../assets/social/social_2.jpg',
        name: 'Homer Simpson (Dad)',
        birthday: new Date('1985-05-15'),
        details: 'Our hilarious dad, the king of dad jokes and the master of relaxation. He turns every moment into an adventure and teaches us not to take life too seriously. His love for us is as vast as his appetite for donuts!',
      },
      {
        imgURL: '../../../../../assets/social/social_3.jpg',
        name: 'Stewie Griffin (Brother)',
        birthday: new Date('1980-07-29'),
        details: 'Our dear brother, the source of endless laughter and joy. He knows how to turn an ordinary day into an extraordinary one. His creativity and enthusiasm make every family gathering an unforgettable experience.',
      },
      {
        imgURL: '../../../../../assets/social/social_4.jpg',
        name: 'Dexter (Son)',
        birthday: new Date('1982-05-14'),
        details: 'Our adventurous son who brings excitement and curiosity to our family. He\'s not just our son but also our risk-taker, always pushing boundaries and inspiring us to embrace challenges. Life with Dexter is a thrilling journey!',
      },
      {
        imgURL: '../../../../../assets/social/social_1.jpg',
        name: 'Pikachu (Mom)',
        birthday: new Date('1990-01-01'),
        details: 'Our amazing mom who always brings warmth and comfort to the family. She is the heart of our home, a master of delicious meals, and a pro at soothing away any troubles. Her love is the guiding light that keeps our family together.',
      },
      {
        imgURL: '../../../../../assets/social/social_2.jpg',
        name: 'Homer Simpson (Dad)',
        birthday: new Date('1985-05-15'),
        details: 'Our hilarious dad, the king of dad jokes and the master of relaxation. He turns every moment into an adventure and teaches us not to take life too seriously. His love for us is as vast as his appetite for donuts!',
      },
      {
        imgURL: '../../../../../assets/social/social_3.jpg',
        name: 'Stewie Griffin (Brother)',
        birthday: new Date('1980-07-29'),
        details: 'Our dear brother, the source of endless laughter and joy. He knows how to turn an ordinary day into an extraordinary one. His creativity and enthusiasm make every family gathering an unforgettable experience.',
      },
      {
        imgURL: '../../../../../assets/social/social_4.jpg',
        name: 'Dexter (Son)',
        birthday: new Date('1982-05-14'),
        details: 'Our adventurous son who brings excitement and curiosity to our family. He\'s not just our son but also our risk-taker, always pushing boundaries and inspiring us to embrace challenges. Life with Dexter is a thrilling journey!',
      },
      {
        imgURL: '../../../../../assets/social/social_1.jpg',
        name: 'Pikachu (Mom)',
        birthday: new Date('1990-01-01'),
        details: 'Our amazing mom who always brings warmth and comfort to the family. She is the heart of our home, a master of delicious meals, and a pro at soothing away any troubles. Her love is the guiding light that keeps our family together.',
      },
      {
        imgURL: '../../../../../assets/social/social_2.jpg',
        name: 'Homer Simpson (Dad)',
        birthday: new Date('1985-05-15'),
        details: 'Our hilarious dad, the king of dad jokes and the master of relaxation. He turns every moment into an adventure and teaches us not to take life too seriously. His love for us is as vast as his appetite for donuts!',
      },
      {
        imgURL: '../../../../../assets/social/social_3.jpg',
        name: 'Stewie Griffin (Brother)',
        birthday: new Date('1980-07-29'),
        details: 'Our dear brother, the source of endless laughter and joy. He knows how to turn an ordinary day into an extraordinary one. His creativity and enthusiasm make every family gathering an unforgettable experience.',
      },
      {
        imgURL: '../../../../../assets/social/social_4.jpg',
        name: 'Dexter (Son)',
        birthday: new Date('1982-05-14'),
        details: 'Our adventurous son who brings excitement and curiosity to our family. He\'s not just our son but also our risk-taker, always pushing boundaries and inspiring us to embrace challenges. Life with Dexter is a thrilling journey!',
      },
    ];

    return of(mockData);
  }
}
