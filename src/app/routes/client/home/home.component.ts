import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-client-home',
  templateUrl:'./home.component.html',
  styleUrl: './home.component.scss',
  standalone: true,
  imports: [
    FormsModule,
  ],
})
export class HomeComponent {

}
