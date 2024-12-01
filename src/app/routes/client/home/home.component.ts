import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '@core/services/product.service';
import { tap } from 'rxjs';
import { CategoryService } from '@core/services/categogy.service';
import { CommonModule } from '@angular/common';
import { baseImage } from '@core/services/constant';
import { RouterLink } from '@angular/router';
import { PageEvent, MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-client-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, MatPaginatorModule],
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  category: any[] = [];
  products: any[] = [];
  productResponse:any = {
    data: [],
    pageSize: 10,
    pageIndex: 1,
    total: 0
  };
  categorySelected = 'all';
  baseImage = 'http://103.101.162.250:8080/';
  constructor() {}
  ngOnInit() {
    const pageIndex = this.productResponse.pageIndex;
    const pageSize = this.productResponse.pageSize;
    this.getData({pageIndex,pageSize});
    this.getCategory();
  }

  getData(params:any = { limit: 200}) {
    this.productService
      .getAll(params)
      .pipe(
        tap(value => {
          console.log(value);
        })
      )
      .subscribe(value => {
        this.productResponse = value;
        this.products = value.data;
      });
  }
  getCategory() {
    this.categoryService
      .getAll({})
      .pipe(
        tap(value => {
          console.log(value);
        })
      )
      .subscribe(value => {
        this.category = value;
      });
  }

  handlePageEvent(event: PageEvent) {
    const pageIndex = event.pageIndex + 1;
    const pageSize = event.pageSize;
    this.getData({pageIndex, pageSize ,limit: 200});
  }

  renderImage(url: string) {
    console.log('url:', url);
    return baseImage + 'Product/' + url;
  }

  handleFilter(category: any,event: any ){
    event.preventDefault();
    this.categorySelected = category.id;
    this.getData({
      categoryId: category.id ==='all' ? '' : category.id,
      limit: 200
    });
  }
}
