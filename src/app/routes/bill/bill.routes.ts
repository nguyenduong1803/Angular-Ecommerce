import { Routes } from '@angular/router';

import { BillListComponent } from './bill-list/bill-list.component';
import { SaveFormComponent } from './saveForm/saveForm.component';

export const routes: Routes = [
  { path: 'list', component: BillListComponent },
  { path: 'save/:id', component: SaveFormComponent },
];
