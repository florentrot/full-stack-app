import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../../data/interfaces/User";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/v1/user';

  constructor(private httpClient: HttpClient) {}

  getUserByEmail(userEmail: string): Observable<User> {
    const url = `${this.baseUrl}/${userEmail}`;
    return this.httpClient.get<User>(url);
  }
}
