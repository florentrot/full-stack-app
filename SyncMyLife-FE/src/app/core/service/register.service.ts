import {Injectable} from '@angular/core';
import {Endpoints} from "../../data/endpoints";
import {RegisterRequestDTO} from "../../data/interfaces/RegisterRequestDTO";
import {AuthDTO} from "../../data/interfaces/AuthDTO";
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
    return this.http.post<AuthDTO>(`${this.registerUrl}/register`, registerRequest);
  }

  confirmEmail(validationCode: any) {
    return this.http.post<AuthDTO>(`${this.registerUrl}/confirmAccount`, {validationCode: validationCode});
  }

  resendValidationCode() {
    return this.http.post<String>(`${this.registerUrl}/resendValidationCode`, {})
  }

}
