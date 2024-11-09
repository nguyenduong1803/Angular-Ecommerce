import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-client-layout',
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    CommonModule,
   MatMenuModule
  ],
})
export class ClientLayoutComponent implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  private readonly router = inject(Router);
  ngOnInit(): void {
    const hasToke = localStorage.getItem('laptop_ecommerce_token');
    const isAdmin = localStorage.getItem('laptop_ecommerce_role');
    this.isAdmin = !!isAdmin;
    this.isLoggedIn = hasToke ? true : false;
  }

  logout() {
    localStorage.removeItem('laptop_ecommerce_token');
    localStorage.removeItem('laptop_ecommerce_role');
    this.router.navigateByUrl('/auth/login');
  }
}
