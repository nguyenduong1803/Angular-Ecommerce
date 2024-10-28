import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from './constant';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  protected readonly http = inject(HttpClient);
  constructor() {}
  create(body: any) {
    return this.http.post(baseUrl + 'Bill', body);
  }
  update(body: any) {
    return this.http.put(baseUrl + 'Bill/' + body.id, body);
  }
  getAll(params: any) {
    return this.http.get(baseUrl + 'Bill/Paging', { params });
  }
}
