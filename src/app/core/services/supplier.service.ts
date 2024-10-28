import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  protected readonly http = inject(HttpClient);
  constructor() {}
  create(body: any) {
    return this.http.post(baseUrl + 'Supplier', body);
  }
  update(body: any) {
    return this.http.put(baseUrl + 'Supplier/' + body.id, body);
  }
  getAll(params: any) {
    return this.http.get(baseUrl + 'Supplier', { params });
  }
  delete(id: string) {
    return this.http.delete(baseUrl + 'Supplier', { params: { id } });
  }
}