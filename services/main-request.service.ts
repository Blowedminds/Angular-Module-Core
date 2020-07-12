import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RoutingListService} from './routing-list.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class MainRequestService {

  public static MAIN_URI: string = environment.apiUrl;

  constructor(
    protected http: HttpClient,
    protected routingListService: RoutingListService
  ) {
  }

  makeGetRequest(key: string, id?: string): Observable<any> {
    const url = this.makeUrl(key, id || '');

    return this.http
      .get(url);
  }

  makePostRequest(key: string, data: any, id?: string): Observable<any> {
    const url = this.makeUrl(key, id || '');

    return this.http
      .post(url, JSON.stringify(data));
  }

  makePutRequest(key: string, data: any, id?: string): Observable<any> {
    const url = this.makeUrl(key, id || '');

    return this.http
      .put(url, JSON.stringify(data));
  }

  makeDeleteRequest(key: string, id: string) {
    const url = this.makeUrl(key, id);

    return this.http
      .delete(url);
  }

  makePostRequestWithFormData(key: string, formData: FormData, id?: string): Observable<any> {
    const url = this.makeUrl(key, id || '');

    const options = {
      headers: new HttpHeaders({
        enctype: 'multipart/form-data'
      })
    };

    return this.http
      .post(url, formData, options);
  }

  makePostRequestWithProgressReport(key: string, formData: FormData, id?: string): Observable<any> {
    const url = this.makeUrl(key, id || '');

    const options = {
      headers: new HttpHeaders({
        enctype: 'multipart/form-data'
      }),
      reportProgress: true
    };

    const req = new HttpRequest('POST', url, formData, options);

    return this.http
      .request(req);
  }

  getHttpClient(): HttpClient {
    return this.http;
  }

  makeUrl(key: string, url?: string): string {
    const route = this.routingListService.getUrl(key);

    return MainRequestService.MAIN_URI + route + (url || '');
  }
}
