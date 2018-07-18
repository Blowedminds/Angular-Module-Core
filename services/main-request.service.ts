import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, Observable } from 'rxjs/operators';

import { HelpersService } from './helpers.service';
import { RoutingListService } from './routing-list.service';
import { environment } from '../../../environments/environment';

import swal from 'sweetalert2';

@Injectable()
export class MainRequestService {

  public MAIN_URI: string = environment.apiUrl;

  get options() {
    this._options.params.token = this.helpersService.getToken();

    return this._options;
  }

  private _options: any = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      // 'X-Socket-ID': ''
    }),
    params: {
      token: null
    }
  };

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

  makeUrl(key: string, url?: string): string {
    const route = this.routingListService.getUrl(key);

    return this.MAIN_URI + route + (url || '');
  }

  protected getToken(): string {
    return this.helpersService.getToken();
  }

  protected handleError(error: any, router: any = null): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only

    switch (error.status) {
      case 401:
        this.helpersService.navigate(['login']);
        break;
      case 421:
        this.helpersService.navigate([error.link]);
        break;
      default:
        swal({
          title: 'Error!',
          type: 'error',
          text: 'We have encountered with an error, you should send this error trace to us to improve stability',
          confirmButtonText: 'Send Report',
          showCancelButton: true,
        }).then((result) => {
          if (result.value) {
            const rq1 = this.makePostRequest('core.error', error).subscribe(response => {
              swal({
                title: 'Thank you!',
                timer: 1500
              });

              rq1.unsubscribe();
            });
          }
        });
    }
    return Promise.reject(error.message || error);
  }
}
