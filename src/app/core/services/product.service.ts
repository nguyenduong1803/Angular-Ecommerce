import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from './constant';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  protected readonly http = inject(HttpClient);
  constructor() {}
  create(body: any) {
    return this.http.post(baseUrl + 'Product', body);
  }
  uploadImage(body: any) {
    return this.http.post(baseUrl + 'UPload', body);
  }
  update(body: any) {
    return this.http.put(baseUrl + 'Product/' + body.id, body);
  }
  getAll(params: any) {
    return this.http.get<any>(baseUrl + 'Product/Paging', { params });
  }
  getById(id: any) {
    return this.http.get<any>(baseUrl + 'Product/GetById/' + id);
  }
  delete(id: string) {
    return this.http.delete(baseUrl + 'Product/'+id, { });
  }
}
