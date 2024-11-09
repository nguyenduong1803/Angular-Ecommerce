import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BILL_STATUS, billColor } from '@core';
import { BillService } from '@core/services/bill.service';
import type { Bill } from '@core/types';
import { MtxSelectModule } from '@ng-matero/extensions/select';

@Component({
  selector: 'app-forms-select-detail',
  templateUrl: './bill-detail.component.html',
  styleUrl: './bill-detail.component.scss',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatFormFieldModule, MtxSelectModule,MatButton,MatDialogClose],
  providers:[
    {
      provide: MatDialogRef,
      useValue: {}
      },
  ]
})
export class BillDetailComponent implements OnInit  {
  private billService = inject(BillService);
  billStatus = BILL_STATUS;
  bill: Bill ={
    id: '',
    title: '',
    description: '',
    showCloseIcon: false,
    disableClose: false,
    userId: 0,
    userName: '',
    fullName: '',
    phone: '',
    email: '',
    note: '',
    paymentMethod: '',
    createdAt: '',
    total: 0,
    amount: 0,
    status: 0,
    address: '',
  };
  constructor(
    public dialogRef: MatDialogRef<BillDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Bill
  ) {
    console.log(this.data);

  }
  ngOnInit(): void {
    this.getData();
  }

  getData(){
    this.billService.getById(this.data.id).subscribe((data: any) => {
      this.bill = data.data[0].bill;
      console.log('data:', data.data[0]);
    });
  }
  defaultBindingsList = [
    { value: 1, label: 'Vilnius' },
    { value: 2, label: 'Kaunas' },
    { value: 3, label: 'Pavilnys', disabled: true },
  ];

  getBillColor(status: any) {
    return billColor[status as keyof typeof billColor];
  }

  getStatusLabel(status: any) {
    console.log('status:', status);
    return this.billStatus[status as keyof typeof this.billStatus];
  }

  selectedCity = null;
}
