import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, signal, ViewEncapsulation } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';

import { BrandingComponent } from '../widgets/branding.component';
import { UserPanelComponent } from './user-panel.component';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatSlideToggleModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    BrandingComponent,
    UserPanelComponent,
    CommonModule,
    MatExpansionModule,
    RouterLink
  ],
})
export class SidebarComponent {
  @Input() showToggle = true;
  @Input() showUser = true;
  @Input() showHeader = true;
  @Input() toggleChecked = false;

  @Output() toggleCollapsed = new EventEmitter<void>();
  @Output() closeSidenav = new EventEmitter<void>();
  readonly panelOpenState = signal(false);
  expandedIndex = 0;
  menuList = [
    {
      route: 'dashboard',
      name: 'dashboard',
      type: 'link',
      icon: 'dashboard',
      badge: {
        color: 'red-50',
        value: '5'
      },
      children:[
        {
          route: 'dashboard',
          name: 'dashboard',
          type: 'link'
        },
      ]
    },

    {
      route: 'product/list',
      name: 'product',
      type: 'sub',
      icon: 'format_line_spacing',
      children: [
        {
          route: 'product/list',
          name: 'product list',
          type: 'link'
        },
        {
          route: 'product/save/add',
          name: 'create product',
          type: 'link'
        }
      ],
    },

    {
      route: 'admin/category',
      name: 'category',
      type: 'sub',
      icon: 'all_inbox',
      children: [
        {
          route: 'category/list',
          name: 'category list',
          type: 'link'
        },
        {
          route: 'category/save/add',
          name: 'create category',
          type: 'link'
        }
      ],
    },

    {
      route: 'admin/bill',
      name: 'bill',
      type: 'sub',
      icon: 'format_line_spacing',
      children: [
        {
          route: 'bill/list',
          name: 'bill list',
          type: 'link'
        },
        {
          route: 'bill/save/add',
          name: 'create bill',
          type: 'link'
        }
      ],
    },

    {
      route: 'admin/supplier',
      name: 'supplier',
      type: 'sub',
      icon: 'favorite',
      children: [
        {
          route: 'supplier/list',
          name: 'supplier list',
          type: 'link'
        },
        {
          route: 'supplier/save/list',
          name: 'create supplier',
          type: 'link'
        }
      ],
    },
  ];
}
