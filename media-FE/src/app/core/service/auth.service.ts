import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Endpoints } from "../../data/endpoints";
import { AuthDto } from "../../data/interfaces/AuthDto";
import { Observable } from "rxjs/internal/Observable";
import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthenticationRequestDTO } from "../../data/interfaces/AuthenticationRequestDTO";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authUrl = `${Endpoints.auth}`
  jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(authRequest: AuthenticationRequestDTO): Observable<any> {
    return this.http.post<AuthDto>(`${this.authUrl}/authenticate`, authRequest);
  }

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
    this.router.navigate(['public/about']);
  }
}
