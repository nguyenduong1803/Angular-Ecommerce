import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';

import { PageHeaderComponent } from '@shared';
import { tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { BillService } from '@core/services/bill.service';

@Component({
  selector: 'app-table-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrl: './bill-list.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MtxGridModule,
    PageHeaderComponent,
    RouterLink
  ],
})
export class BillListComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);

  columns: MtxGridColumn[] = [
    {
      header: 'Username',
      field: 'userName',
      sortable: false,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'FullName',
      field: 'fullName',
      sortable: false,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Phone',
      field: 'phone',
      minWidth: 100,
    },
    {
      header: 'Email',
      field: 'email',
      minWidth: 100,
    },
    {
      header: 'Total',
      field: 'total',
      minWidth: 100,
    },
    {
      header: 'Amount',
      field: 'amount',
      minWidth: 100,
    },
    {
      header: 'Tax',
      field: 'tax',
      minWidth: 100,
    },
    {
      header: 'Created At',
      field: 'createdAt',
      minWidth: 100,
    },
    {
      header: 'Note',
      field: 'note ',
      minWidth: 200,
    },
    {
      header: 'Action',
      field: 'operation',
      minWidth: 140,
      width: '140px',
      pinned: 'right',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          icon: 'edit',
          tooltip: this.translate.stream('edit'),
          click: record => {},
        },
      ],
    },
  ];
  list: any[] = [];
  isLoading = true;

  multiSelectable = true;
  rowSelectable = true;
  hideRowSelectionCheckbox = false;
  showToolbar = true;
  columnHideable = true;
  columnSortable = true;
  columnPinnable = true;
  rowHover = false;
  rowStriped = false;
  showPaginator = true;
  expandable = false;
  columnResizable = false;
  private billService = inject(BillService);
  category: any[] = [];
  products: any[] = [];
  ngOnInit() {
    this.isLoading = false;
    this.getData();
  }

  getData() {
    this.billService
      .getAll({})
      .pipe(
        tap(value => {
          console.log(value);
        })
      )
      .subscribe((value:any) => {
        this.products = value.data;
      });
  }

  delete(value: any) {
    this.dialog.alert(`You have deleted ${value.position}!`);
  }

  changeSelect(e: any) {
    console.log(e);
  }

  changeSort(e: any) {
    console.log(e);
  }

  enableRowExpandable() {
    this.columns[0].showExpand = this.expandable;
  }

  updateCell() {
    this.list = this.list.map(item => {
      item.weight = Math.round(Math.random() * 1000) / 100;
      return item;
    });
  }

  updateList() {
    this.list = this.list.splice(-1).concat(this.list);
  }
}
