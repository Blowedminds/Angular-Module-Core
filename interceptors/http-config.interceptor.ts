import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

import {Observable, Subject, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Router} from '@angular/router';
import {RequestFailService} from '../services/request-fail.service';
import {RetryRequest} from '../models';
import {RoutingListService} from '../services/routing-list.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  loginUrl: string;

  constructor(
    private router: Router,
    private requestFailService: RequestFailService,
    private routingListService: RoutingListService,
    private httpHandler: HttpHandler
  ) {
    // Recursion issue can occur.
    this.requestFailService.retryFailedRequests.subscribe((retryRequest: RetryRequest) => {
        this.intercept(retryRequest.req, this.httpHandler).subscribe(response => {
          retryRequest.subject.next(response);
        });
      }
    );

    this.loginUrl = this.routingListService.getUrl('auth.login');
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
        const navigated = this.router.navigated;
        const notLoginPage = this.router.url.indexOf('/auth/login') === -1;
        const notLoginPopup = this.router.url.indexOf('(auth:popup)') === -1;
        const notLoginRequest = req.url.indexOf(this.loginUrl) === -1;

        const shouldRetryRequest = navigated && notLoginRequest;
        const shouldNavigateLoginPopup = navigated && notLoginPage && notLoginPopup;
        const shouldNavigateLoginPage = !navigated && notLoginPage;

        if (shouldNavigateLoginPage) {
          this.router.navigate(['auth/login']).then();
        } else if (shouldNavigateLoginPopup) {
          this.router.navigate([{outlets: {auth: ['popup']}}]).then();
        }

        if (shouldRetryRequest) {
          const subject = new Subject();
          setTimeout(() => this.requestFailService.failedRequests.next({req, subject}), 0);
          return subject;
        }

        break;
      case 422:
        break;
      default:
        console.log(error);
    }

    return throwError(error);
  }
}
