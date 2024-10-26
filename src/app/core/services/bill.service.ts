import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root',
})
export class BillService {
  protected readonly http = inject(HttpClient);
  constructor() {}
  create(body: any) {
    return this.http.post(environment.baseUrl + 'Bill', body);
  }
  update(body: any) {
    return this.http.put(environment.baseUrl + 'Bill/' + body.id, body);
  }
  getAll(params: any) {
    return this.http.get(environment.baseUrl + 'Bill/Paging', { params });
  }
}
