import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpParams } from '@angular/common/http';

import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { HelpersService } from './helpers.service';
import { RoutingListService } from './routing-list.service';
import { environment } from '../../../environments/environment';

import swal from 'sweetalert2';

@Injectable()
export class MainRequestService {

  public MAIN_URI: string = environment.apiUrl;

  get options() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      }),
      params: (new HttpParams()).set('token', this.helpersService.getToken())
    };
  }

  constructor(
    protected http: HttpClient,
    protected helpersService: HelpersService,
    protected routingListService: RoutingListService
  ) { }

  makeGetRequest(key: string, id?: string): Observable<any> {
    const url = this.makeUrl(key, id || '');

    return this.http
      .get(url, this.options)
      .pipe(catchError(error => this.handleError(error)));
  }

  makePostRequest(key: string, data: any, id?: string): Observable<any> {
    const url = this.makeUrl(key, id || '');

    return this.http
      .post(url, JSON.stringify(data), this.options)
      .pipe(catchError(error => this.handleError(error)));
  }

  makePutRequest(key: string, data: any, id?: string): Observable<any> {
    const url = this.makeUrl(key, id || '');

    return this.http
      .put(url, JSON.stringify(data), this.options)
      .pipe(catchError(error => this.handleError(error)));
  }

  makeDeleteRequest(key: string, id: string) {
    const url = this.makeUrl(key, id);

    return this.http
      .delete(url, this.options)
      .pipe(catchError(error => this.handleError(error)));
  }

  makePostRequestWithFormData(key: string, formData: FormData, id?: string): Observable<any> {
    const url = this.makeUrl(key, id || '');

    const options = this.options;

    options.headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
      'X-Requested-With': 'XMLHttpRequest'
    });

    return this.http
      .post(url, formData, options)
      .pipe(catchError(error => this.handleError(error)));
  }

  makePostRequestWithProgressReport(key: string, formData: FormData, id?: string): Observable<any> {
    const url = this.makeUrl(key, id || '');

    const options = this.options;

    options.headers = new HttpHeaders({
      'enctype': 'multipart/form-data',
      'X-Requested-With': 'XMLHttpRequest'
    });

    options['reportProgress'] = true;

    const req = new HttpRequest('POST', url, formData, options);

    return this.http
      .request(req)
      .pipe(catchError(error => this.handleError(error)));
  }

  makeUrl(key: string, url?: string): string {
    const route = this.routingListService.getUrl(key);

    return this.MAIN_URI + route + (url || '');
  }

  protected getToken(): string {
    return this.helpersService.getToken();
  }

  protected handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only

    switch (error.status) {
      case 401:
        this.helpersService.navigate(['login']);
        break;
      case 409:
        if (error.error.errorCode === '23000' || error.error.errorCode === 23000) {
          swal.fire({
            title: 'Bu öğe kullanılıyor',
            type: 'error',
            text: 'Silmeye çalıştığınız öğe başka bir alan içerisinde kullanılıyor'
          });
        }

        break;
      case 421:
        this.helpersService.navigate([error.link]);
        break;
      case 422:
        break;
      default:
        swal.fire({
          title: error.status + ' ' + error.statusText,
          type: 'error',
          text: error.name,
          confirmButtonText: 'Ok',
          showCancelButton: true,
        }).then((result) => result);
    }

    return Promise.reject(error);
  }
}
