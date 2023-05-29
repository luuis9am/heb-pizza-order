import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
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

  authenticateUser(userLoginForm: any): Observable<any> {
    const loginUrl = environment.apiMap.BASE_API_URL + ApiEndpoints.auth
    return this.httpClient.post<any>(loginUrl, userLoginForm,
      {'headers': this.setLoginHeader()})
  }

  async requestToken(loginFormValue: UserCredentials): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.authenticateUser(JSON.stringify((loginFormValue.valueOf()))).subscribe(
        response => resolve(response),
        error => reject(error)
      )
    })
  }

}
