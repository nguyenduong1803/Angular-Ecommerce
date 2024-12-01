import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
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
import { Subscription } from 'rxjs';

import { PageHeaderComponent } from '@shared';
import { SupplierService } from '@core/services/supplier.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forms-supplier-saveForm',
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
  private supplierService = inject(SupplierService);
  private readonly router = inject(Router);

  reactiveForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    Logo: [null],
  });
  category: any[] = [];
  supplier: any[] = [];
  fileName = '';
  selectedFiles:any[] = [];

  supplierId: string | null = null;
  isCreate = false;

  private translateSubscription = Subscription.EMPTY;

  ngOnInit() {
    this.translateSubscription = this.translate.onLangChange.subscribe((res: { lang: any }) => {
      this.dateAdapter.setLocale(res.lang);
    });
    this.getParams();
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
        Logo: this.selectedFiles as any
      });
    }
  }
  onSubmit() {
    if (this.reactiveForm.valid) {
      console.log('Form Submitted!', this.reactiveForm.value);
      // Thực hiện các hành động như gọi API
      const formData = new FormData();
      const {value:{name}} = this.reactiveForm;
      formData.append('Name', name || '');
      if (this.selectedFiles) {
        for (let i = 0; i < this.selectedFiles.length; i++) {
          formData.append('Logo', this.selectedFiles[i]);
        }
      }
      if(this.isCreate){

        this.supplierService.create(formData).subscribe((value)=>{
          this.snackBar.open('create success', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.router.navigateByUrl('/admin/supplier/list');
          this.reactiveForm.reset();
        },()=>{
          this.snackBar.open('Something went wrong', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        });
      }else{
        this.supplierService.create({...formData,id:this.supplierId}).subscribe((value)=>{
          this.snackBar.open('update success', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
          this.router.navigateByUrl('/admin/supplier/list');
          this.reactiveForm.reset();
        },()=>{
          this.snackBar.open('Something went wrong', 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['error-snackbar']
          });
        });
      }
    } else {
      console.log('Form is invalid');
    }
  }

  getParams(){
    this.route.paramMap.subscribe(params => {
      if(params.get('id') === 'add'){
        this.isCreate = true;
      }else{
        this.supplierId = params.get('id');
        this.getDetailData(params.get('id') || '');
      }
    });
  }

  getDetailData(id:string){
    this.supplierService.getById(id).subscribe(data => {
      console.log('data:', data);
      this.reactiveForm.reset(data[0]);
    });
  }

}
