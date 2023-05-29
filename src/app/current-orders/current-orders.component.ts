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

  async ngOnInit(): Promise<void> {
    await this.fillOrdersTable().then();
  }

  async fillOrdersTable(): Promise<any> {
    await this.orderService.getOrders()
      .then((currentPizzaOrders: PlacedPizzaOrder[]) => {
        this.dataSource = new MatTableDataSource(currentPizzaOrders);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
      .catch(error => {
        console.error(error.error);
        this.snackbarService.openErrorSnackBar('Issue in Obtaining Orders', '')
      })
  }

  deleteOrder(orderID: number) {
    this.orderService.deleteOrder(orderID)
      .then(async () => {
        this.snackbarService.openSuccessSnackBar('Deleted Successfully', '')
        await this.fillOrdersTable().then();
      })
      .catch((error) => {
          console.error(error);
          this.snackbarService.openErrorSnackBar('Issue in Submitting Order', error.error.msg)
        }
      )
  }

  formatTimestamp(timestamp: string): string {
    const formattedDate = this.datePipe.transform(timestamp, 'MMM dd, HH:mm');
    return formattedDate || '';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.toString().trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
