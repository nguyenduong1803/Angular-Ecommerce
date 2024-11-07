import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '@core/services/product.service';
import { tap } from 'rxjs';
import { CategoryService } from '@core/services/categogy.service';
import { CommonModule } from '@angular/common';
import { baseImage } from '@core/services/constant';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  category: any[] = [];
  products: any[] = [];
  categorySelected = 'all';
  baseImage = 'http://transytrong20.ddns.net:12345/';
  constructor() {}
  ngOnInit() {
    this.getData({});
    this.getCategory();
  }

  getData(params = {}) {
    this.productService
      .getAll(params)
      .pipe(
        tap(value => {
          console.log(value);
        })
      )
      .subscribe(value => {
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

  renderImage(url: string) {
    console.log('url:', url);
    return baseImage + 'Product/' + url;
  }

  handleFilter(category: any,event: any ){
    event.preventDefault();
    console.log('category:', category);
    this.categorySelected = category.id;
    this.getData({
      categoryId: category.id ==='all' ? '' : category.id
    });
  }
}
