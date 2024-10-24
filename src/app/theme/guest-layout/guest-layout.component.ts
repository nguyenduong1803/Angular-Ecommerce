import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-guest-layout',
  templateUrl: './guest-layout.component.html',
  styleUrl: './guest-layout.component.scss',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [RouterOutlet],
})
export class GuestLayoutComponent {}
