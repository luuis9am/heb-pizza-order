import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {ApiEndpoints} from "../shared/constants/api-endpoints";
import {Observable} from "rxjs";
import {PlacedPizzaOrder} from "../shared/models/pizza-order.model";

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

  getOrders(): Observable<PlacedPizzaOrder[]> {
    const orderUrl = environment.apiMap.BASE_API_URL + ApiEndpoints.orders;
    return this.httpClient.get<PlacedPizzaOrder[]>(orderUrl);
  }

  postOrder(orderForm: any): Observable<any> {
    const postOrderUrl = environment.apiMap.BASE_API_URL + ApiEndpoints.orders;
    return this.httpClient.post<any>(postOrderUrl,orderForm, {'headers': this.setHttpHeader()});
  }

  deleteOrder(orderID: number): Observable<any> {
    const orderUrl = environment.apiMap.BASE_API_URL + ApiEndpoints.orders + '/' + orderID;
    return this.httpClient.delete<any>(orderUrl);
  }

}
