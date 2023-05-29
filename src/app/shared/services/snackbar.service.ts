import {Injectable} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar"

@Injectable()
export class SnackbarService {
  constructor(public _snackBar: MatSnackBar) {
  }

  openErrorSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 7000, horizontalPosition: "right", verticalPosition: "bottom",
      panelClass: ['error-snackbar']
    });
  }

  openSuccessSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 7000, horizontalPosition: "right", verticalPosition: "bottom",
      panelClass: ['success-snackbar']
    });
  }
}
