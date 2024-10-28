import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class OptionService {
  protected readonly http = inject(HttpClient);
  constructor() {}
  create(body: any) {
    return this.http.post(baseUrl + 'Option', body);
  }
  update({ id, ...body }: any) {
    return this.http.put(baseUrl + 'Option/' + id, body);
  }
  getAll(params: any) {
    return this.http.get(baseUrl + 'Option', { params });
  }
  delete(id: string) {
    return this.http.delete(baseUrl + 'Option', { params: { id } });
  }
}
