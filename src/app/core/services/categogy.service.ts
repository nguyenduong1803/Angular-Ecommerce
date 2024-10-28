import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from './constant';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  protected readonly http = inject(HttpClient);
  constructor() {}
  create(body: any) {
    return this.http.post(baseUrl + 'Category', body);
  }
  update(body: any) {
    return this.http.put(baseUrl + 'Category/' + body.id, body);
  }
  getAll(params: any) {
    return this.http.get<any>(baseUrl + 'Category', { params });
  }
  delete(id: string) {
    return this.http.delete(baseUrl + 'Category', { params: { id } });
  }
}
