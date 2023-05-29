import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {environment} from "../../../environments/environment";
import {ApiEndpoints} from "../constants/api-endpoints";
import {Router} from "@angular/router";

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private readonly router: Router) {  }

  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('userToken');
    const tokenUrl = httpRequest.url.startsWith(environment.apiMap.BASE_API_URL + ApiEndpoints.auth);
    if (token && !tokenUrl) {
      httpRequest = httpRequest.clone({
        setHeaders: {Authorization: `Bearer ${token}`}
      });
    }

    return next.handle(httpRequest).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status === 401) {
            this.router.navigate(['login']).then();
          }
        }
        return throwError(error);
      })
    )
  }
}
