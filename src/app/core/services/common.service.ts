import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  protected readonly http = inject(HttpClient);
  constructor() {}
  getSupplier() {
    return this.http.get(baseUrl + 'Common/Supplier');
  }
  getBillStatus() {
    return this.http.get(baseUrl + 'Common/BillStatus');
  }
}
