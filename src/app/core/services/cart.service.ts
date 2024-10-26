import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  protected readonly http = inject(HttpClient);
  constructor() {}
  create(body: any) {
    return this.http.post(environment.baseUrl + 'Cart', body);
  }
  update(body: any) {
    return this.http.put(environment.baseUrl + 'Cart/' + body.id, body);
  }
  getAll(params: any) {
    return this.http.get(environment.baseUrl + 'Cart/Paging', { params });
  }
  delete(id: string) {
    return this.http.delete(environment.baseUrl + 'Cart', { params: { id } });
  }
}
