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
import { Router, RouterLink } from '@angular/router';
import { ConfirmComponent } from '@shared/components/confirm/confirm.component';

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
    RouterLink
  ],
})
export class ProductListComponent implements OnInit {

  private readonly translate = inject(TranslateService);
  private readonly dialog = inject(MtxDialog);
  private readonly router = inject(Router);
  columns: MtxGridColumn[] = [
    {
      header: 'Product name',
      field: 'name',
      sortable: false,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Code',
      field: 'code',
      sortable: false,
      disabled: true,
      minWidth: 100,
      width: '100px',
    },
    {
      header: 'Category',
      field: 'categoryName',
      minWidth: 100,
    },
    {
      header: 'Supplier',
      field: 'supplierName',
      minWidth: 100,
    },
    {
      header: 'Description',
      field: 'description',
      minWidth: 300,
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
          click: record => {
            this.router.navigateByUrl('/admin/product/save/'+record.id);
          },
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
    this.dialog.confirm(`Delete product!`,'Are you sure want delete product?',()=>{
      console.log('ok');
      this.productService.delete(value.id).subscribe(data => {
      this.dialog.alert('Delete success.');
      },()=>{
        this.dialog.alert('Delete error.');
      });
    });
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

  // constructor(public dialog: MatDialog) {}

  // openConfirmDialog(): void {
  //   const dialogRef = this.dialog.open(ConfirmComponent);

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       // Xử lý logic xóa ở đây
  //       console.log('Đã xóa thành công!');
  //     } else {
  //       console.log('Hủy xóa!');
  //     }
  //   });
  // }
}
