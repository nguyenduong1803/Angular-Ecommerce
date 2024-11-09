import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from './constant';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  protected readonly http = inject(HttpClient);
  constructor() {}
  create(body: any) {
    return this.http.post(baseUrl + 'Payment', body);
  }
  update(body: any) {
    return this.http.put(baseUrl + 'Payment/' + body.id, body);
  }
  getAll(params: any) {
    return this.http.get(baseUrl + 'Payment', { params });
  }
}
