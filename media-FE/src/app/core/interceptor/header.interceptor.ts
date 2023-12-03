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
    if (!request.url.includes('/api/v1/auth/')) {
      request = this.addToken(request);
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = '';
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerSideExceptions(error);
        }
        if (error.status === HttpStatusCode.Unauthorized) {
          this.router.navigate(['/auth/login']);
        }
        return throwError(() => errorMsg);
      })
    );
  }


  private addToken(request: HttpRequest<any>) {
    return request.clone({
      setHeaders: {
        Authorization: `${localStorage.getItem('token')}`,
      },
    });
  }

  private getServerSideExceptions(error: HttpErrorResponse): string {
    if (error?.error==='This email is already in use') {
      return error.error;
    } else if(error?.error==='Your validation code expired') {
      return error.error;
    } else if(error?.error==='Your code is invalid') {
      return error.error;
    }else {
      return `Error Code: ${error.status}, Message: ${error.message}`;
    }
  }
}
