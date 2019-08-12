import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { routes } from '../../routes';
@Injectable()
export class RoutingListService {

  routes: any;

  constructor() { this.routes = routes; }

  getUrl(key: string): string {
    const parsedKey = this.parseKey(key);

    let route = this.routes;

    let url = '';

    for (let i = 0; i < parsedKey.length; i++) {

      const subRoute = route[parsedKey[i]];

      if (typeof subRoute === 'string') {
        url += subRoute;
      } else {
        url += route[parsedKey[i]].url;
      }

      route = subRoute;
    }

    return url;
  }

  parseKey(key: string): Array<string> {
    const parsedKey = [];

    for (let i = 0; i < key.length; i++) {

      const index = key.indexOf('.');

      if (index === -1) {

        parsedKey.push(key);

        break;
      } else if (index !== 0) {

        parsedKey.push(key.slice(0, index));
      }

      key = key.slice(index + 1);
    }

    return parsedKey;
  }
}
