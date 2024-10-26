import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class OptionService {
  protected readonly http = inject(HttpClient);
  constructor() {}
  create(body: any) {
    return this.http.post(environment.baseUrl + 'Option', body);
  }
  update({ id, ...body }: any) {
    return this.http.put(environment.baseUrl + 'Option/' + id, body);
  }
  getAll(params: any) {
    return this.http.get(environment.baseUrl + 'Option', { params });
  }
  delete(id: string) {
    return this.http.delete(environment.baseUrl + 'Option', { params: { id } });
  }
}
