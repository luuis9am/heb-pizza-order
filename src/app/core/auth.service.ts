import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiEndpoints} from "../shared/constants/api-endpoints";
import {environment} from "../../environments/environment";

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
    let headers = this.setLoginHeader();
    const loginUrl = environment.apiMap.BASE_API_URL + ApiEndpoints.auth
    return this.httpClient.post<any>(loginUrl, userLoginForm, {'headers': headers})
  }
}
