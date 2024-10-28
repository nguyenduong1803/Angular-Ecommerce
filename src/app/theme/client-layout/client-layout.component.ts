import { Component, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

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
  ],
})
export class ClientLayoutComponent {
  isLoggedIn = true;
}
