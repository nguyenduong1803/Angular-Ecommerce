import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from './constant';
import { Bill } from '@core/types';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  protected readonly http = inject(HttpClient);
  constructor() {}
  create(body: any) {
    return this.http.post(baseUrl + 'Bill/AddToBill', body);
  }
  update(body: any) {
    return this.http.put(baseUrl + 'Bill/' + body.id, body);
  }
  getAll(params: any) {
    return this.http.get(baseUrl + 'Bill/Paging', { params });
  }
  getDetail(id: any) {
    return this.http.get(baseUrl + 'Bill/'+id, );
  }
  getById(id: any) {
    return this.http.get<Bill>(baseUrl + 'BillRecord/BillDetail/'+id, );
  }
  getByUser() {
    return this.http.get<Bill>(baseUrl + 'Bill/BillByUser', );
  }
}
