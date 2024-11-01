import { Routes } from '@angular/router';

import { ProductListComponent } from './bill-list/bill-list.component';
import { SaveFormComponent } from './saveForm/saveForm.component';

export const routes: Routes = [
  { path: 'list', component: ProductListComponent },
  { path: 'save/:id', component: SaveFormComponent },
];