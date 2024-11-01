import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
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
import { ActivatedRoute } from '@angular/router';
import { BillService } from '@core/services/bill.service';

@Component({
  selector: 'app-forms-bill-saveForm',
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
  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute) {}

  private readonly fb = inject(FormBuilder);
  private readonly dateAdapter = inject(DateAdapter);
  private readonly translate = inject(TranslateService);
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private supplierService = inject(SupplierService);
  private billService = inject(BillService);
  bill:any = {};
  billId:any = "";

  reactiveForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
    categoryId: [''],
    supplierId: ['', [Validators.required]],
    description: [''],
    UpdateImages: [null],
  });
  category: any[] = [];
  supplier: any[] = [];
  fileName: string = '';
  selectedFiles:any[] = []
  private translateSubscription = Subscription.EMPTY;

  ngOnInit() {
    this.translateSubscription = this.translate.onLangChange.subscribe((res: { lang: any }) => {
      this.dateAdapter.setLocale(res.lang);
    });
    this.getCategory();
    this.getSupplier();
    this.getParams()
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
    if (this.reactiveForm.valid) {
      console.log('Form Submitted!', this.reactiveForm.value);
      // Thực hiện các hành động như gọi API

      this.billService.create(this.reactiveForm.value).subscribe((value)=>{
        this.snackBar.open('create success', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']
        });
        this.reactiveForm.reset();
      },()=>{
        this.snackBar.open('Something went wrong', 'Close', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'top',
          panelClass: ['error-snackbar']
        });
      })
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

        this.billId = params.get('id');
        this.getDetailData(params.get('id') || "")
    });
  }

  getDetailData(id:string){
    this.billService.getDetail(id).subscribe(data => {
      this.bill = data
    })
  }
}
