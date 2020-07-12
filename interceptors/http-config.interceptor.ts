import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable, Subject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {RequestFailService, RetryRequest} from '../services/request-fail.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private requestFailService: RequestFailService,
    private httpHandler: HttpHandler
  ) {
    // Recursion issue can occur.
    this.requestFailService.retryFailedRequests.subscribe((retryRequest: RetryRequest) => {
        this.intercept(retryRequest.req, this.httpHandler).subscribe(response => {
          retryRequest.subject.next(response);
        });
      }
    );
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');

    req = req.clone({headers: req.headers.set('Authorization', `Bearer ${token}`)});
    req = req.clone({headers: req.headers.set('Content-Type', 'application/json')});
    req = req.clone({headers: req.headers.set('Accept', 'application/json')});

    return next.handle(req).pipe(
      catchError(error => this.handlerError(error, req))
    );
  }

  private handlerError(error: any, req: HttpRequest<any>): Observable<any> {
    switch (error.status) {
      case 401:
        if (this.router.navigated && this.router.url !== '/auth/login') {
          this.router.navigate([{outlets: {auth: ['popup']}}]);
          const subject = new Subject();
          setTimeout(() => this.requestFailService.failedRequests.next({req, subject}), 0);
          return subject;
        } else if (this.router.url !== '/auth/login') {
          this.router.navigate(['auth/login']);
        }
        break;
      case 422:
        break;
      default:
        swal.fire({
          title: error.status + ' ' + error.statusText,
          icon: 'error',
          text: error.name,
          confirmButtonText: 'Ok',
          showCancelButton: true,
        }).then((result) => result);
    }

    return throwError(error);
  }
}
