import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from './constant';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  protected readonly http = inject(HttpClient);
  constructor() {}
  create(body: any) {
    return this.http.post(baseUrl + 'Cart', body);
  }
  update(body: any) {
    return this.http.put(baseUrl + 'Cart/' + body.id, body);
  }
  getAll(params: any) {
    return this.http.get(baseUrl + 'Cart/Paging', { params });
  }
  delete(id: string) {
    return this.http.delete(baseUrl + 'Cart', { params: { id } });
  }
}
