import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { TranslateService } from '@ngx-translate/core';

import { PageHeaderComponent } from '@shared';
import { TablesDataService } from '../data.service';
import { ProductService } from '@core/services/product.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-table-product-list',
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss',
  providers: [TablesDataService],
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatRadioModule,
    MtxGridModule,
    PageHeaderComponent,
  ],
})
export class ProductListComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);

  columns: MtxGridColumn[] = [
    {
      header: 'Tên sản phẩm',
      field: 'name',
      sortable: false,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Mã sản phẩm',
      field: 'code',
      sortable: false,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Danh mục',
      field: 'categoryName',
      minWidth: 100,
    },
    {
      header: 'Nhà cung cấp',
      field: 'supplierName',
      minWidth: 100,
    },
    {
      header: 'Mô tả',
      field: 'description',
      minWidth: 300,
    },
    {
      header: 'Hành động',
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
        {
          type: 'icon',
          color: 'warn',
          icon: 'delete',
          tooltip: this.translate.stream('delete'),
          pop: {
            title: this.translate.stream('confirm_delete'),
            closeText: this.translate.stream('close'),
            okText: this.translate.stream('ok'),
          },
          click: record => this.delete(record),
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
  private productService = inject(ProductService);
  category: any[] = [];
  products: any[] = [];
  ngOnInit() {
    this.isLoading = false;
    this.getData();
  }

  getData() {
    this.productService
      .getAll({})
      .pipe(
        tap(value => {
          console.log(value);
        })
      )
      .subscribe(value => {
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
