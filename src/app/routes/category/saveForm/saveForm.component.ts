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
import { Subscription, tap } from 'rxjs';
import { CategoryService } from '@core/services/categogy.service';

import { PageHeaderComponent } from '@shared';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forms-category-saveForm',
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
  constructor(private snackBar: MatSnackBar,private route: ActivatedRoute) {}

  private readonly fb = inject(FormBuilder);
  private readonly dateAdapter = inject(DateAdapter);
  private readonly translate = inject(TranslateService);
  private categoryService = inject(CategoryService);

  reactiveForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    id: [''],
  });
  category: any[] = [];
  supplier: any[] = [];
  fileName = '';
  selectedFiles:any[] = [];
  private translateSubscription = Subscription.EMPTY;
  categoryId: string | null = null;
  isCreate = false;
  ngOnInit() {
    this.translateSubscription = this.translate.onLangChange.subscribe((res: { lang: any }) => {
      this.dateAdapter.setLocale(res.lang);
    });
    this.getParams();
  }

  ngOnDestroy() {
    this.translateSubscription.unsubscribe();
  }


  onSubmit() {
    if (this.reactiveForm.valid) {
      console.log('Form Submitted!', this.reactiveForm.value);

      if(this.isCreate){
        this.categoryService.create(this.reactiveForm.value).subscribe((value)=>{
          this.snackBar.open('create category success', 'Close', {
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
        });
      }else{
        this.categoryService.update({...this.reactiveForm.value,id: this.categoryId}).subscribe((value)=>{
          this.snackBar.open('Update category success', 'Close', {
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
        this.categoryId = params.get('id');
        this.getDetailData(params.get('id') || '');
      }
    });
  }

  getDetailData(id:string){
    this.categoryService.getById(id).subscribe(data => {
      this.reactiveForm.reset(data[0]);
    });
  }
}
