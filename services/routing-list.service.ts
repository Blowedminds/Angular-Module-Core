import {Injectable} from '@angular/core';

import {routes} from '../../routes';

@Injectable()
export class RoutingListService {

  routes: any;

  constructor() { this.routes = routes; }


  getUrl(key: string): string {
    const parsedKey = this.parseKey(key);

    let route = this.routes;

    let url = '';

    for (const k of parsedKey) {

      const subRoute = route[k];

      if (typeof subRoute === 'string') {
        url += subRoute;
      } else {
        url += route[k].url;
      }

      route = subRoute;
    }

    return url;
  }

  parseKey(key: string): Array<string> {
    const parsedKey = [];

    while (key.length > 0) {
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
