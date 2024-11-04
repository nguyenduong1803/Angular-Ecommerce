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
  baseImage = 'http://transytrong20.ddns.net:12345/';
  constructor() {}
  ngOnInit() {
    this.getData();
    this.getCategory();
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
}
