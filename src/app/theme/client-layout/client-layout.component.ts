import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.scss',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
  ],
})
export class ClientLayoutComponent {
  constructor(private dialog: MatDialog) {}
  cartItemCount = 0; // Bạn có thể lấy số lượng từ dịch vụ giỏ hàng

  openSignUp() {}

  viewCart() {
    // Logic để xem giỏ hàng
  }

  checkout() {
    // Logic để thanh toán
  }

  login() {
    // Logic để đăng nhập
  }
}
