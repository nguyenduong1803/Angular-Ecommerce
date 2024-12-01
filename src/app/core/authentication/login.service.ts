import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';

import { Menu } from '@core';
import { Token, User } from './interface';
import { baseUrl } from '@core/services/constant';

interface LoginResponse {
  token:string;
  role:string;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  protected readonly http = inject(HttpClient);

  login(username: string, password: string, rememberMe = false) {
    return this.http.post<Token>('/auth/login', { username, password, rememberMe });
  }
  loginServer(username: string, password: string) {
    return this.http.post<LoginResponse>(baseUrl + 'Auth', { username, password });
  }
  signUp(body: any) {
    return this.http.post<LoginResponse>(baseUrl + 'Auth/SignUp', body);
  }

  refresh(params: Record<string, any>) {
    return this.http.post<Token>('/auth/refresh', params);
  }

  logout() {
    return this.http.post<any>('/auth/logout', {});
  }

  me() {
    return this.http.get<User>('/me');
  }

  menu() {
    return this.http.get<{ menu: Menu[] }>('/me/menu').pipe(map(res => res.menu));
  }
}
