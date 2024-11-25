import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '@core/services/cart.service';
import { CommentService } from '@core/services/comment.service';
import { ProductService } from '@core/services/product.service';
import { MtxDialog } from '@ng-matero/extensions/dialog';
import { tap } from 'rxjs';
import { Comment, ProductCommentComponent } from '../product-comment/product-comment.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, ProductCommentComponent],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: any;
  baseImage = 'http://transytrong20.ddns.net:12345/';
  productSelected: null | number = null;
  private readonly dialog = inject(MtxDialog);
  comments: any = {
    data: [
      {
        id: 1,
        username: 'John Doe',
        content: 'Great product! Highly recommended.',
        createdAt: '2024-10-10',
      },
      // ... more comments
    ],
    pageSize: 10,
    pageIndex: 1,
    total: 50, // total number of comments
  };
  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.getParams();
    this.getDetailData(this.productId || '');
    this.getComment({ productId: this.productId });
  }
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private commentService = inject(CommentService);
  getParams() {
    this.route.paramMap.subscribe(params => {
      this.productId = params.get('id');
      window.scrollTo(0, 0);
    });
  }

  getDetailData(id: string) {
    this.productService.getById(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.product = data.data;
        this.productSelected = this.product.options.length > 0 ? this.product.options[0].id : null;
      },
      error: error => {
        console.log(error);
      },
    });
  }

  getComment(params: any) {
    this.commentService.getByProductId(params).subscribe((data: any) => {
      console.log(data);
      this.comments = data;
    });
  }

  setProductSelect(id: number) {
    this.productSelected = id;
  }

  handleAddToCart() {
    this.cartService
      .create({
        optionId: this.productSelected,
        quantity: 1,
      })
      .subscribe(
        () => {
          this.snackBar.open('Add to cart success!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-container', 'success'],
          });
        },
        error => {
          this.snackBar.open('Please login to add to cart.', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-container', 'success'],
          });
        }
      );
  }
}
