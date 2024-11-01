import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@core/services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  productId: string | null = null;
  product: any;
  constructor( private route: ActivatedRoute) {

  }
  ngOnInit(){
    this.getParams()
  }
  private productService = inject(ProductService);
  getParams(){
    this.route.paramMap.subscribe(params => {

        this.productId = params.get('id');
        this.getDetailData(params.get('id') || "")
    });
  }

  getDetailData(id:string){
    this.productService.getDetail(id).subscribe(data => {
      this.product = data
    })
  }
}
