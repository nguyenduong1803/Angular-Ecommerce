import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { NewsComponent } from './news/news.component';
import { ServiceComponent } from './service-page/service.component';
import { BillListClientComponent } from '../bill/bill-list-client/bill-list.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'news', component: NewsComponent },
  { path: 'services', component: ServiceComponent },
  { path: 'individual-bill', component: BillListClientComponent },
];
