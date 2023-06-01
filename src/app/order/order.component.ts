import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {OrderService} from "./order.service";
import {
  FormBuilder,
  Validators,
} from "@angular/forms";
import {SnackbarService} from "../shared/services/snackbar.service";
import {Constants} from "../shared/constants/constants";
import {NewPizzaOrder} from "../shared/models/pizza-order.model";
import {concatMap, from} from "rxjs";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  displayedColumns: string[] = ['Table_No', 'Size', 'Flavor', 'Crust', 'Delete'];
  crustType: string[] = Constants.crustTypes;
  flavors: string[] = Constants.flavors;
  sizes: string[] = Constants.sizes;
  tables: number[] = Constants.tableNumbers;
  selectedCrust?: string;
  selectedFlavor?: string;
  selectedSize?: string;
  selectedTable?: number;
  dataSource!: MatTableDataSource<any>;
  pizzaOrderList = [];


  orderFormGroup = this.formBuilder.group({
    Crust: [this.selectedCrust, [Validators.required]],
    Flavor: [this.selectedFlavor, [Validators.required]],
    Size: [this.selectedSize, [Validators.required]],
    Table_No: [this.selectedTable, [Validators.required]],
  })


  constructor(private orderService: OrderService,
              private formBuilder: FormBuilder,
              private snackbarService: SnackbarService,) {
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<NewPizzaOrder>(this.pizzaOrderList);
  }

  submitOrders(pizzaOrders: NewPizzaOrder[]): void {
    if (this.dataSource.data.length > 0) {
      if (this.validateDuplicates(pizzaOrders)) {
        from(pizzaOrders).pipe(
          concatMap(pizza => this.orderService.postOrder(pizza)),
        ).subscribe({
          next: () => {},
          error: error => {
            console.error(error);
            this.snackbarService.openErrorSnackBar('Error in submitting ', '');
          },
          complete: () => {
            this.clearOrders();
            this.snackbarService.openSuccessSnackBar('Order(s) Submitted Successfully', '');
          },
        });
      } else {
        this.snackbarService.openErrorSnackBar('House rules, no duplicate pizza requests', '');
      }
    } else {
      this.snackbarService.openErrorSnackBar('No orders to submit', '');
    }
  }

  validateDuplicates(pizzaList: NewPizzaOrder[]): boolean {
    const uniqueSet = new Set();

    for (const pizza of pizzaList) {
      const { Crust, Flavor, Size, Table_No } = pizza;
      const uniqueKey = `${Crust}-${Flavor}-${Size}-${Table_No}`;

      if (uniqueSet.has(uniqueKey)) {
        return false; // Duplicate found
      }

      uniqueSet.add(uniqueKey);
    }

    return true;
  }

  addPizzaToCurrentOrder(order: any): void {
      this.dataSource.data.push(order);
      this.dataSource.data = [...this.dataSource.data];
      this.dataSource._updateChangeSubscription();
      console.log("added" + order);
  }

  removePizzaFromCurrentOrder(item: NewPizzaOrder): void {
    const index = this.dataSource.data.indexOf(item);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
      this.dataSource._updateChangeSubscription();
    }
    this.snackbarService.openSuccessSnackBar('Removed Order Item', '')
  }

  resetOrderForm(): void {
    this.orderFormGroup.reset();
  }

  clearOrders(): void {
    if (this.dataSource.data.length > 0) {
      this.dataSource.data = [];
      this.dataSource._updateChangeSubscription();
    } else {
      this.snackbarService.openErrorSnackBar('No current orders to cancel', '')
    }
  }

}
