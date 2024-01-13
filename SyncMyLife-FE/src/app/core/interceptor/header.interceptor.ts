import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpStatusCode
} from '@angular/common/http';

import {Router} from "@angular/router";
import {Observable} from "rxjs/internal/Observable";
import {throwError} from "rxjs/internal/observable/throwError";
import {catchError} from "rxjs/internal/operators/catchError";

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (this.shouldAddToken(request)) {
      request = this.addToken(request);
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const errorMsg = this.handleError(error);
        this.handleUnauthorizedError(error);
        return throwError(() => errorMsg);
      })
    );
  }

  private shouldAddToken(request: HttpRequest<unknown>): boolean {
    const authApiUrl = '/api/v1/auth/';
    const excludeTokenUrl = '/api/v1/auth/resendValidationCode';

    return !request.url.includes(authApiUrl) || request.url.includes(excludeTokenUrl);
  }

  private addToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    });
  }

  private handleUnauthorizedError(error: HttpErrorResponse): void {
    if (error.status === HttpStatusCode.Unauthorized) {
      this.router.navigate(['/auth/login']);
    }
  }

  private handleError(error: HttpErrorResponse): string {
    if (error.error instanceof ErrorEvent) {
      return `Error: ${error.error.message}`;
    } else {
      return this.getServerSideExceptions(error);
    }
  }

  private getServerSideExceptions(error: HttpErrorResponse): string {
    const specificErrors = [
      'This email is already in use',
      'Your validation code expired',
      'Your code is invalid',
      'Wait 10 minutes to be able to request a new confirmation code',
    ];

    return specificErrors.includes(error?.error) ? error.error : `Error Code: ${error.status}, Message: ${error.message}`;
  }
}
