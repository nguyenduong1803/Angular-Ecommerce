import { animate, state, style, transition, trigger } from '@angular/animations';
import { AsyncPipe, NgTemplateOutlet, SlicePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NgxPermissionsModule } from 'ngx-permissions';

import { MenuService } from '@core';
import { NavAccordionItemDirective } from './nav-accordion-item.directive';
import { NavAccordionToggleDirective } from './nav-accordion-toggle.directive';
import { NavAccordionDirective } from './nav-accordion.directive';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrl: './sidemenu.component.scss',
  encapsulation: ViewEncapsulation.None,
  // changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    AsyncPipe,
    SlicePipe,
    NgTemplateOutlet,
    RouterLink,
    RouterLinkActive,
    NgxPermissionsModule,
    MatIconModule,
    MatRippleModule,
    TranslateModule,
    NavAccordionDirective,
    NavAccordionItemDirective,
    NavAccordionToggleDirective,
  ],
  animations: [
    trigger('expansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: '' })),
      transition(
        'expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4,0,0.2,1)')
      ),
    ]),
  ],
})
export class SidemenuComponent implements OnInit {
  // The ripple effect makes page flashing on mobile
  @Input() ripple = false;

  private readonly menu = inject(MenuService);
  ngOnInit(): void {
    console.log('menu:', this.menuList);
  }
  menuList = [
    {
      route: 'dashboard',
      name: 'dashboard',
      type: 'link',
      icon: 'dashboard',
      badge: {
        color: 'red-50',
        value: '5'
      }
    },

    {
      route: 'admin/product',
      name: 'product',
      type: 'sub',
      icon: 'format_line_spacing',
      children: [
        {
          route: 'list',
          name: 'list',
          type: 'link'
        },
        {
          route: 'remote-data',
          name: 'category',
          type: 'link'
        }
      ],
      permissions: {
        except: 'GUEST'
      }
    },

    {
      route: 'admin/category',
      name: 'category',
      type: 'sub',
      icon: 'all_inbox',
      children: [
        {
          route: 'list',
          name: 'list',
          type: 'link'
        },
        {
          route: 'remote-data',
          name: 'category',
          type: 'link'
        }
      ],
      permissions: {
        except: 'GUEST'
      }
    },

    {
      route: 'admin/bill',
      name: 'bill',
      type: 'sub',
      icon: 'format_line_spacing',
      children: [
        {
          route: 'list',
          name: 'list',
          type: 'link'
        },
        {
          route: 'remote-data',
          name: 'bill',
          type: 'link'
        }
      ],
      permissions: {
        except: 'GUEST'
      }
    },

    {
      route: 'admin/supplier',
      name: 'supplier',
      type: 'sub',
      icon: 'favorite',
      children: [
        {
          route: 'list',
          name: 'list',
          type: 'link'
        },
        {
          route: 'remote-data',
          name: 'supplier',
          type: 'link'
        }
      ],
      permissions: {
        except: 'GUEST'
      }
    },
  ];

  // menu$ = this.menu.getAll();

  // buildRoute = this.menu.buildRoute;
}
