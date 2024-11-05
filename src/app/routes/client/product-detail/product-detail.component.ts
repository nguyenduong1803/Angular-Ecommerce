import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { ProductService } from '@core/services/product.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: any;
  baseImage = 'http://transytrong20.ddns.net:12345/';
  productSelected:null | number = null;
  constructor(private route: ActivatedRoute, private snackBar: MatSnackBar) {}
  ngOnInit() {
    this.getParams();
    console.log(this.productId);
    this.getDetailData(this.productId || '');
    console.log(this.product);
  }
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  getParams() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
    });
  }

  getDetailData(id: string) {
    this.productService.getById(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.product = data.data;
        this.productSelected = this.product.options.length > 0 ? this.product.options[0].id : null;
      },
      error:(error)=>{
        console.log(error);
      }
    });
  }

  setProductSelect(id:number){
    this.productSelected = id;
  }

  handleAddToCart(){
    this.cartService.create({
      optionId:this.productSelected,
      quantity: 1,
    }).subscribe(()=>{
      this.snackBar.open('add to cart success', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['success-snackbar']
      });
    });
  }
}
