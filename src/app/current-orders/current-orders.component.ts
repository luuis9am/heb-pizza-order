import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {OrderService} from "../order/order.service";
import {SnackbarService} from "../shared/services/snackbar.service";
import {DatePipe} from "@angular/common";
import {PlacedPizzaOrder} from "../shared/models/pizza-order.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-current-orders',
  templateUrl: './current-orders.component.html',
  styleUrls: ['../order/order.component.scss']
})
export class CurrentOrdersComponent  implements OnInit {
  displayedColumns: string[] = ['Table_No', 'Timestamp', 'Size', 'Flavor', 'Crust', 'Delete'];
  selectedTableFilter: number | null = null;
  dataSource!: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private orderService: OrderService,
              private formBuilder: FormBuilder,
              private snackbarService: SnackbarService,
              private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.fillOrdersTable();
  }

  fillOrdersTable(): void {
    this.orderService.getOrders().subscribe(
      (currentPizzaOrders: PlacedPizzaOrder[]) => {
        this.dataSource = new MatTableDataSource(currentPizzaOrders);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error => {
        console.error(error);
        this.snackbarService.openErrorSnackBar('Issue in Obtaining Orders', '');
      }
    );
  }

  deleteOrder(orderID: number) {
    this.orderService.deleteOrder(orderID).subscribe(
      () => {
        this.snackbarService.openSuccessSnackBar('Deleted Successfully', '')
        this.fillOrdersTable();
      },
      error => {
          console.error(error);
          this.snackbarService.openErrorSnackBar('Issue in Deleting Order', '')
        }
      )
  }

  formatTimestamp(timestamp: string): string {
    const formattedDate = this.datePipe.transform(timestamp, 'MMM dd, HH:mm');
    return formattedDate || '';
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim().toLowerCase();
    this.dataSource.filterPredicate = (placedPizzaOrder: PlacedPizzaOrder, filter: string) => {
      const formattedDate = this.formatTimestamp(placedPizzaOrder.Timestamp).toLowerCase();
      return placedPizzaOrder.Crust.toLowerCase().includes(filter)
        || placedPizzaOrder.Flavor.toLowerCase().includes(filter)
        || placedPizzaOrder.Size.toLowerCase().includes(filter)
        || placedPizzaOrder.Table_No.toString().includes(filter)
        || formattedDate.includes(filter);
    };

    this.dataSource.filter = filterValue;

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
