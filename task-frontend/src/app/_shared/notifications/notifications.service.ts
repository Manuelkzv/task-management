import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  readonly SNACKBAR_DURATION = 3 * 1000;
  constructor(private snackBar: MatSnackBar) {}

  openSnackbar(message: string): void {
    this.snackBar.open(message, 'x', {
      duration: this.SNACKBAR_DURATION,
    });
  }
}
