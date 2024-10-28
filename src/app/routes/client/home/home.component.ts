import { FormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '@core/services/product.service';
import { tap } from 'rxjs';
import { CategoryService } from '@core/services/categogy.service';
import { CommonModule } from '@angular/common';
import { environment } from '@env/environment';

@Component({
  selector: 'app-client-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [FormsModule, CommonModule],
})
export class HomeComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  category: any[] = [];
  products: any[] = [];
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
      .subscribe((value) => {
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

  renderImage(url: string){
    return environment.baseUrl + 'Product/'+url
  }
}
