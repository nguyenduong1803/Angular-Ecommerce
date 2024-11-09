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
import { Router, RouterLink } from '@angular/router';
import { CategoryService } from '@core/services/categogy.service';

@Component({
  selector: 'app-table-category-list',
  templateUrl: './category-list.component.html',
  styleUrl: './category-list.component.scss',
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
  constructor(private router: Router) { }
  columns: MtxGridColumn[] = [
    {
      header: 'Category name',
      field: 'name',
      sortable: false,
      minWidth: 100,
      width: '200px',
    },
    {
      header: 'Product count',
      field: 'productCount',
      sortable: false,
      disabled: true,
      minWidth: 100,
      width: '200px',
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
            console.log('record:', record);
            this.router.navigate([`admin/category/save`, record.id ]);
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
  private categoryService = inject(CategoryService);
  category: any[] = [];
  ngOnInit() {
    this.isLoading = false;
    this.getData();
    console.log(this.category);
  }

  getData() {
    this.categoryService
      .getAll({
        pageSize: 200
      })
      .pipe(
        tap(value => {
          console.log(value);
        })
      )
      .subscribe(value => {
        console.log(value);
        this.category = value;

      });
  }

  delete(value: any) {
    this.dialog.confirm(`Delete category!`,'Are you sure want delete category?',()=>{
      console.log('ok');
      this.categoryService.delete(value.id).subscribe(data => {
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
}
