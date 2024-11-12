import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { baseUrl } from './constant';

@Injectable({
  providedIn: 'root',
})

export class CommentService {
  protected readonly http = inject(HttpClient);
  constructor() {}
  create(body: any) {
    return this.http.post(baseUrl + 'Comment', body);
  }
  update(body: any) {
    return this.http.put(baseUrl + 'Comment/' + body.id, body);
  }
  getAll(params: any) {
    return this.http.get(baseUrl + 'Comment/Paging', { params });
  }
  getByProductId(params: any) {
    return this.http.get(baseUrl + 'Comment/Paging',{params} );
  }

}
