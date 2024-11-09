import { Component, inject, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { BILL_STATUS } from '@core';
import { BillService } from '@core/services/bill.service';
import type { Bill } from '@core/types';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-forms-select-detail',
  templateUrl: './edit-bill.component.html',
  styleUrl: './edit-bill.component.scss',
  standalone: true,
  imports: [ FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    CommonModule,
    MatDialogModule,
    TranslateModule,
    MatDialogClose
  ],
  providers:[
    {
      provide: MatDialogRef,
      useValue: {}
      },
  ]
})
export class BillEditComponent implements OnInit  {
  private billService = inject(BillService);
  billStatus = BILL_STATUS;
  selectedStatus = 0;
  constructor(
    public dialogRef: MatDialogRef<BillEditComponent>,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Bill
  ) {
    console.log(this.data);

  }
  private readonly fb = inject(FormBuilder);

  reactiveForm = this.fb.nonNullable.group({
    status: [this.data.status, [Validators.required]],

  });
  ngOnInit(): void {

  }

  billStatusOption = [
    { value: 0, label: 'Pending' },
    { value: 1, label: 'Shipping' },
    { value: 2, label: 'Paid' },
    { value: 3, label: 'Cancelled' },
  ];

  onStatusChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    console.log('selectElement:', selectElement);
  }

  onSubmit(){
    if(this.reactiveForm.valid){
      const body = {
        ...this.reactiveForm.value,
        id: this.data.id
      };
      this.billService.update(body).subscribe(data =>{
        this.snackBar.open('update bill success', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        if(this.data?.onCloseEdit){
          this.data?.onCloseEdit();
        }
      });
    }
  }

  selectedCity = null;
}
