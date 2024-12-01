import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { DateAdapter, MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription, tap } from 'rxjs';
import { CategoryService } from '@core/services/categogy.service';

import { ControlsOf, IProfile, PageHeaderComponent } from '@shared';
import { SupplierService } from '@core/services/supplier.service';
import { CommonModule } from '@angular/common';
import { ProductService } from '@core/services/product.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forms-saveForm',
  templateUrl: './saveForm.component.html',
  styleUrl: './saveForm.component.scss',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    TranslateModule,
    PageHeaderComponent,
    CommonModule
  ],
})
export class SaveFormComponent implements OnInit, OnDestroy {
  @ViewChild('myButton') myButton!: any;
  productForm: FormGroup;
  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute) {
    this.productForm = this.fb.group({
      products: this.fb.array([])
    });

    this.addProduct();
  }

  private readonly fb = inject(FormBuilder);
  private readonly dateAdapter = inject(DateAdapter);
  private readonly translate = inject(TranslateService);
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private supplierService = inject(SupplierService);
  private readonly router = inject(Router);

  reactiveForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
    categoryId: [''],
    supplierId: ['', [Validators.required]],
    description: [''],
    UpdateImages: [null],
  });
  productId: string | null = null;
  isCreate = false;
  loading = false;

  category: any[] = [];
  supplier: any[] = [];
  fileName = '';
  selectedFiles:any[] = [];
  private translateSubscription = Subscription.EMPTY;

  ngOnInit() {
    this.translateSubscription = this.translate.onLangChange.subscribe((res: { lang: any }) => {
      this.dateAdapter.setLocale(res.lang);
    });
    this.getCategory();
    this.getParams();
    this.getSupplier();
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;

    if (this.selectedFiles && this.selectedFiles.length > 0) {
      this.fileName = Array.from(this.selectedFiles)
        .map(file => file.name)
        .join(', ');

      // Cập nhật giá trị vào form
      this.reactiveForm.patchValue({
        UpdateImages: this.selectedFiles as any
      });
    }
  }
  onSubmit() {
    // click submit
    if (this.myButton._elementRef.nativeElement) {
      this.myButton._elementRef.nativeElement.click();
    }

    if (this.reactiveForm.valid && this.productForm.valid) {
      this.loading = true;
      console.log('Form Submitted!', this.reactiveForm.value);
      // Thực hiện các hành động như gọi API
      const formData = new FormData();
      const {value:{categoryId,code,description,name,supplierId}} = this.reactiveForm;
      const {value:{ products }} = this.productForm;
      const parseOption = JSON.stringify(products);
      formData.append('name', name || '');
      formData.append('code', code || '');
      formData.append('categoryId', categoryId || '');
      formData.append('supplierId', supplierId || '');
      formData.append('description', description || '');
      formData.append('options', parseOption || '');
      if (this.selectedFiles) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('UpdateImages', this.selectedFiles[i]);
        }
      }

      if(this.isCreate){
        this.productService.create(formData).subscribe((value)=>{
          this.snackBar.open('Create product success!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.router.navigateByUrl('/admin/product/list');
          this.reactiveForm.reset();
        },()=>{
          // this.snackBar.open('Something went wrong', 'Close', {
          //   duration: 3000,
          //   horizontalPosition: 'right',
          //   verticalPosition: 'top',
          //   panelClass: ['error-snackbar']
          // });
        });
      }else{
        this.productService.update({...formData,id:this.productId}).subscribe((value)=>{
          this.snackBar.open('Update product success!', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.router.navigateByUrl('/admin/product/list');
          this.reactiveForm.reset();
        },()=>{
          // this.snackBar.open('Something went wrong', 'Close', {
          //   duration: 3000,
          //   horizontalPosition: 'right',
          //   verticalPosition: 'top',
          //   panelClass: ['error-snackbar']
          // });
        });
      }
      this.loading = false;
    } else {
      console.log('Form is invalid');
    }
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
  getSupplier() {
    this.supplierService
      .getAll({})
      .pipe(
        tap(value => {
          console.log(value);
        })
      )
      .subscribe(value => {
        this.supplier = value as any;
      });
  }
  getParams(){
    this.route.paramMap.subscribe(params => {
      if(params.get('id') === 'add'){
        this.isCreate = true;
      }else{
        this.productId = params.get('id');
        this.getDetailData(params.get('id') || '');
      }
      console.log('Product ID:', this.productId);
    });
  }

  getDetailData(id:string){
    this.productService.getById(id).subscribe(data => {
      this.reactiveForm.reset(data.data);
      this.productForm.reset({products:data.data.options});

      const productsArray = this.productForm.get('products') as FormArray;
  productsArray.clear();

  data.data.options.forEach((product:any )=> {
    productsArray.push(this.fb.group({
      id: [product.id],
      name: [product.name],
      price: [product.price],
      quantity: [product.quantity],
      configuration: [product.configuration],
      productId: [product.productId],
      product: [product.product]  // Có thể là null hoặc một giá trị khác
    }));
  });

    });
  }


// FormArray
get products() {
  return this.productForm.get('products') as FormArray;
}

// Tạo một product form group
createProduct(): FormGroup {
  return this.fb.group({
    name: ['', Validators.required],
    price: ['', [Validators.required, Validators.min(0)]],
    quantity: ['', [Validators.required, Validators.min(0)]],
    configuration: this.fb.array([])
  });
}

// Tạo một configuration form group
createConfiguration(): FormGroup {
  return this.fb.group({
    key: ['', Validators.required],
    value: ['', Validators.required]
  });
}

// Thêm product mới
addProduct() {
  this.products.push(this.createProduct());
}

// Xóa product
removeProduct(index: number) {
  this.products.removeAt(index);
}

// Lấy configuration array của một product
getConfigurationArray(productIndex: number): FormArray {
  return this.products.at(productIndex).get('configuration') as FormArray;
}

// Thêm configuration mới vào product
addConfiguration(productIndex: number) {
  const configArray = this.getConfigurationArray(productIndex);
  configArray.push(this.createConfiguration());
}

// Xóa configuration
removeConfiguration(productIndex: number, configIndex: number) {
  const configArray = this.getConfigurationArray(productIndex);
  configArray.removeAt(configIndex);
}
}
