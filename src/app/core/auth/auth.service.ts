import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {ApiEndpoints} from "../../shared/constants/api-endpoints";
import {environment} from "../../../environments/environment";
import {UserCredentials} from "../../shared/models/user-credentials.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpClient: HttpClient) { }

  setLoginHeader(): HttpHeaders {
    return new HttpHeaders()
      .set('content-type', 'application/json')
      .set('accept', '*/*');
  }

  authenticateUser(userLoginForm: UserCredentials): Observable<any> {
    const loginUrl = environment.apiMap.BASE_API_URL + ApiEndpoints.auth;
    return this.httpClient.post<any>(loginUrl, userLoginForm,
      {'headers': this.setLoginHeader()}).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }

  requestToken(loginFormValue: UserCredentials): Observable<any> {
    return this.authenticateUser(loginFormValue);
  }

}
