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
  private readonly fb = inject(FormBuilder);
  private readonly dateAdapter = inject(DateAdapter);
  private readonly translate = inject(TranslateService);
  private categoryService = inject(CategoryService);
  private supplierService = inject(SupplierService);

  reactiveForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    code: ['', [Validators.required]],
    categoryId: [''],
    supplierId: ['', [Validators.required]],
    description: [''],
    UpdateImages: [''],
  });
  category: any[] = [];
  supplier: any[] = [];

  private translateSubscription = Subscription.EMPTY;

  ngOnInit() {
    this.translateSubscription = this.translate.onLangChange.subscribe((res: { lang: any }) => {
      this.dateAdapter.setLocale(res.lang);
    });
    this.getCategory();
    this.getSupplier();
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
  }

  onSubmit() {
    if (this.reactiveForm.valid) {
      console.log('Form Submitted!', this.reactiveForm.value);
      // Thực hiện các hành động như gọi API
    } else {
      console.log('Form is invalid');
      const formData = new FormData()
      const {value:{UpdateImages,categoryId,code,description,name,supplierId}} = this.reactiveForm;
      formData.append("name", name || "")
      formData.append("code", code || "")
      formData.append("categoryId", categoryId || "")
      formData.append("supplierId", supplierId || "")
      formData.append("description", description || "")

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
  getErrorMessage(form: FormGroup<ControlsOf<IProfile>>) {
    return form.get('email')?.hasError('required')
      ? 'validation.required'
      : form.get('email')?.hasError('email')
        ? 'validation.invalid_email'
        : '';
  }
}
