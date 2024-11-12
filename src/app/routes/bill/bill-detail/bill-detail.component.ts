import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatChip, MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { BILL_STATUS, billColor } from '@core';
import { BillService } from '@core/services/bill.service';
import type { Bill } from '@core/types';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { baseImage } from '../../../core/services/constant';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forms-select-detail',
  templateUrl: './bill-detail.component.html',
  styleUrl: './bill-detail.component.scss',
  standalone: true,
  imports: [FormsModule,
     MatDialogModule,
     MatFormFieldModule,
      MtxSelectModule,
      MatButton,
      MatDialogClose,
      MatCard,
      MatCardHeader,
      MatCardTitle,
      MatCardSubtitle,
      MatCardContent,
      MatChipListbox,
      MatChip,
    MatCardModule,
    MatButtonModule,
    MatChipsModule,
    MatIconModule,
    CommonModule
  ],
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
    createAt: '',
    total: 0,
    amount: 0,
    status: 0,
    address: '',
    paymentName: '',
    billDetails: []
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
      this.bill = data.data[0];
      console.log('bill:', this.bill);
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
  getFirstImage(images: any[]): string {
    return images && images.length > 0 ? baseImage+images[0].url : 'assets/placeholder.jpg';
  }
  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }
  getStatusLabel(status: any) {
    console.log('status:', status);
    return this.billStatus[status as keyof typeof this.billStatus];
  }

  selectedCity = null;
}
