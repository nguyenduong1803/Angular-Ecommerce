import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { PreloaderService, SettingsService } from '@core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `<router-outlet />`,
  standalone: true,
  imports: [RouterOutlet, MatSnackBarModule],
})
export class AppComponent implements OnInit, AfterViewInit {
  private readonly preloader = inject(PreloaderService);
  private readonly settings = inject(SettingsService);
  constructor(private router: Router) {

  }
  ngOnInit() {
    this.settings.setDirection();
    this.settings.setTheme();
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      window.scrollTo(0, 0); // Cuộn lên đầu trang
    });
  }

  ngAfterViewInit() {
    this.preloader.hide();
  }
}
