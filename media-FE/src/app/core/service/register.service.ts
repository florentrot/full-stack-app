import {Injectable} from '@angular/core';
import {Endpoints} from "../../data/endpoints";
import {RegisterRequestDTO} from "../../data/interfaces/RegisterRequestDTO";
import {AuthDto} from "../../data/interfaces/AuthDto";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  registerUrl = `${Endpoints.auth}`

  constructor(private http: HttpClient) {
  }

  register(registerRequest: RegisterRequestDTO): Observable<any> {
    return this.http.post<AuthDto>(`${this.registerUrl}/register`, registerRequest);
  }

  confirmEmail(validationCode: any) {
    return this.http.post<AuthDto>(`${this.registerUrl}/confirmAccount`, {validationCode: validationCode});
  }

}
