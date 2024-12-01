import { Component, inject, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardModule, MatCardSubtitle, MatCardTitle } from '@angular/material/card';
import { MatChip, MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MtxSelectModule } from '@ng-matero/extensions/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forms-select-detail',
  templateUrl: './modal-detail.component.html',
  styleUrl: './modal-detail.component.scss',
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
export class ModalDetailComponent implements OnInit  {
  constructor(
    public dialogRef: MatDialogRef<ModalDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(this.data);

  }
  ngOnInit(): void {
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  }

}
