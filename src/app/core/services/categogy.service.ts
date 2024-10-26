import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  protected readonly http = inject(HttpClient);
  constructor() {}
  create(body: any) {
    return this.http.post(environment.baseUrl + 'Category', body);
  }
  update(body: any) {
    return this.http.put(environment.baseUrl + 'Category/' + body.id, body);
  }
  getAll(params: any) {
    return this.http.get(environment.baseUrl + 'Category/Paging', { params });
  }
  delete(id: string) {
    return this.http.delete(environment.baseUrl + 'Category', { params: { id } });
  }
}
