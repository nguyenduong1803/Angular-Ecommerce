import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '@core/services/cart.service';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private cartService = inject(CartService);
  orderForm: FormGroup;
  carts:any[] = [];
  constructor(private fb: FormBuilder) {
    this.orderForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      note: [''],
      address: ['']
    });
  }

  onSubmit(): void {
    console.log(this.orderForm.value);
    if (this.orderForm.valid) {
      // Handle form submission
    }
  }
  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.cartService
      .getByUser({})
      .subscribe(value => {
        console.log('value:', value);
        this.carts = value.options;
      });
  }
}
