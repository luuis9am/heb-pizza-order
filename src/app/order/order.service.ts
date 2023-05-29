import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiEndpoints} from "../shared/constants/api-endpoints";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private readonly httpClient: HttpClient) { }

  setHttpHeader(): HttpHeaders {
    return new HttpHeaders()
      .set('content-type', 'application/json')
      .set('accept', '*/*');
  }

  async getOrders(): Promise<any> {
    const orderUrl = environment.apiMap.BASE_API_URL + ApiEndpoints.orders;
    return this.httpClient.get<any>(orderUrl).toPromise().catch(error => { throw error; });
  }

  async postOrder(orderForm: any): Promise<any> {
    const postOrderUrl = environment.apiMap.BASE_API_URL + ApiEndpoints.orders;
    return this.httpClient.post<any>(postOrderUrl,orderForm, {'headers': this.setHttpHeader()})
      .toPromise().catch(error => {throw error;});
  }

  deleteOrder(orderID: number): Promise<any> {
    const orderUrl = environment.apiMap.BASE_API_URL + ApiEndpoints.orders + '/' + orderID;
    return this.httpClient.delete<any>(orderUrl).toPromise().catch(error => { throw error; });
  }

}
