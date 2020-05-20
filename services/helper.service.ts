import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

@Injectable()
export class HelperService {

  constructor(public router: Router) {
  }

  parseToken(response: any) {
    const token = response.token;
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return {token: token, decodedToken: JSON.parse(window.atob(base64))};
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  setToken(token: string) {
    sessionStorage.setItem('token', token);
  }

  getLocale() {
    return localStorage.getItem('locale') || 'tr';
  }

  navigate(link: Array<any>, options?: any): Promise<boolean> {
    return this.router.navigate(link, options || {});
  }

  navigateByUrl(link: string) {
    return this.router.navigateByUrl(link);
  }
}
