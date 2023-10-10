import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Buffer } from 'buffer';
import { Router } from "@angular/router";
import { Endpoints } from "../../data/endpoints";
import { AuthDto } from "../../data/interfaces/AuthDto";
import { Observable } from "rxjs/internal/Observable";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = `${Endpoints.auth}`

  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  private getHash(userName: string, password: string): string {
    return 'Basic ' + Buffer.from(userName + ':' + password).toString('base64');
  }

  // getToken(userName: string, password: string): Observable<AuthDto> {
  //   const hash: string = this.getHash(userName, password);
  //   return this.http.get<AuthDto>(
  //     this.generateTokenUrl,
  //     this.getOptionsWithAuth(hash) as object
  //   );
  // }

  getToken(userName: string, password: string): Observable<AuthDto> {
    // const hashedPerson: string = this.getHash(userName, password);
    const person = {
      email:userName,
      password:password
    };
    return this.http.post<AuthDto>(`${this.auth}/authenticate`, person);
    // return this.http.post<AuthDto>(`${this.auth}/authenticate`, hashedPerson);
  }

  // getOptionsWithAuth(hash: string): any {
  //   return {
  //     headers: new HttpHeaders({
  //       'content-type': 'application/json',
  //       authorization: hash,
  //     }),
  //     observe: 'body'
  //   }
  // }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token) {
      return this.isTokenValid(token);
    }
    return false;
  }

  isTokenValid(token: string): boolean {
    const isTokenExpired = this.jwtHelper.isTokenExpired(token);
    return !isTokenExpired;
  }

  setSession(authDto: AuthDto) {
    localStorage.setItem('token', 'Bearer ' + authDto.token);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['auth/login']);
  }
}
