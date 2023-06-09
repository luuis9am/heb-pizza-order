import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {OrderComponent} from "./order/order.component";
import {CurrentOrdersComponent} from "./current-orders/current-orders.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'order',
    component: OrderComponent
  },
  {
    path: 'current-orders',
    component: CurrentOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
