import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '@core/services/cart.service';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { BillService } from '@core/services/bill.service';
import { PaymentService } from '@core/services/payment.service';
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule
],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{
  private cartService = inject(CartService);
  private readonly router = inject(Router);
  private billService = inject(BillService);
  private paymentService = inject(PaymentService);
  orderForm: FormGroup;
  paymentMethod:any[] = [];
  carts:any[] = [];
  cartSelected: any[] = [];
  totalAmount = 0;
  baseImage = 'http://103.101.162.250:8080/';
  constructor(private fb: FormBuilder,private snackBar: MatSnackBar, private route: ActivatedRoute) {
    this.orderForm = this.fb.group({
      fullName: ['', Validators.required],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      note: [''],
      address: [''],
      paymentMethod: ['']
    });
  }

  onSubmit(): void {
    console.log(this.orderForm.value);

    const {fullName, phone, email} = this.orderForm.value;

    if(this.cartSelected.length ===0){
      this.snackBar.open('Please choice product!', 'Close', {
        duration: 3000,
        horizontalPosition: 'right',
        verticalPosition: 'top',
        panelClass: ['error-snackbar']
      });
      return;
    }

if(!fullName || !phone || !email){
  this.snackBar.open('Please fill in completely phone, email and fullName!', 'Close', {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
    panelClass: ['error-snackbar']
  });
  return;
}
  this.billService.create({...this.orderForm.value,cartId: this.cartSelected}).subscribe((data)=>{
    this.snackBar.open('Create success bill.', 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: ['error-snackbar','success']
    });
    this.router.navigateByUrl('/individual-bill');
  });
 }
  ngOnInit(): void {
    this.getData();
    this.getPaymentMethod();
  }
  getData() {
    this.cartService
      .getByUser({})
      .subscribe((value:any) => {
        console.log('value:', value);
        this.carts = value;
        this.cartSelected = value.map((item:any)=>item.id);
        this.computedAmount();
      });
  }
  getPaymentMethod() {
      this.paymentService.getAll({})
      .subscribe((value:any) => {
        console.log('value:', value);
        this.paymentMethod = value.data;
        console.log(this.paymentMethod);
      });
  }

  handleCheckbox (cart: any) {
    const cartId = cart.id;
   const index =  this.cartSelected.findIndex((cart)=> cart === cartId);
   console.log('index:', index);
   if(index !== -1){
    this.cartSelected.splice(index,1);
   }else{
    this.cartSelected.push(cartId);
   }
   console.log(this.cartSelected);
   this.computedAmount();
  }

  computedAmount(){
    const listCart = this.carts.filter((item:any)=>this.cartSelected.includes(item.id));
    console.log('listCart:', listCart);
    this.totalAmount = listCart.reduce((a, b) => a + b.quantity * b.options.price, 0);
  }

}
