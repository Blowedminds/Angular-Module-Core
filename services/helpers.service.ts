import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class HelpersService {

  constructor(private router: Router) { }

  parseToken(response: any) {
    const token = response.token;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return { token: token, decodedToken: JSON.parse(window.atob(base64)) };
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  getLocale(): string {
    const locale = localStorage.getItem('locale');

    return locale || 'tr';
  }

  navigate(link: Array<any>, options?: any) {
    return this.router.navigate(link, options || {});
  }

  navigateByUrl(link: string) {
    return this.router.navigateByUrl(link);
  }

  getLocale() {
    return localStorage.getItem('locale') || 'tr';
  }
}
