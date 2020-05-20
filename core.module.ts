import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CacheService } from './services/cache.service';
import { HelperService } from './services/helper.service';
import { MainRequestService } from './services/main-request.service';
import { MainService } from './services/main.service';
import { RoutingListService } from './services/routing-list.service';
import { MainViewModelService } from './services/main-view-model.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HttpConfigInterceptor} from './interceptors/http-config.interceptor';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CacheService,
    HelperService,
    MainRequestService,
    MainService,
    RoutingListService,
    MainViewModelService,
    {provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true}
  ],
  declarations: [
  ]
})
export class CoreModule { }
