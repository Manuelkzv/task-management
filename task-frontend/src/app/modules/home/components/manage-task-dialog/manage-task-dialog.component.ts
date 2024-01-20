import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DIALOG_TEXTS, STATUS_OPTIONS } from '../../utils/consts';
import { DialogData } from '../../utils/interfaces';
import { DialogType, Status } from '../../utils/enums';

@Component({
  selector: 'manage-task-dialog',
  templateUrl: './manage-task-dialog.component.html',
  styleUrls: ['./manage-task-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
  ],
})
export class CreateTaskDialogComponent {
  readonly statusOptions = STATUS_OPTIONS;
  readonly dialogType = DialogType;
  texts: any;

  constructor(
    public dialogRef: MatDialogRef<CreateTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
    this.texts = DIALOG_TEXTS[data.type];
  }
}
