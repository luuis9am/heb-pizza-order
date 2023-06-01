import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiEndpoints} from "../../shared/constants/api-endpoints";
import {environment} from "../../../environments/environment";
import {UserCredentials} from "../../shared/models/user-credentials.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly httpClient: HttpClient) { }

  authenticateUser(userLoginForm: UserCredentials): Observable<any> {
    const loginUrl = environment.apiMap.BASE_API_URL + ApiEndpoints.auth;
    return this.httpClient.post<any>(loginUrl, userLoginForm);
  }

  requestToken(loginFormValue: UserCredentials): Observable<any> {
    return this.authenticateUser(loginFormValue);
  }

}
