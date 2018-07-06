import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CacheService } from './services/cache.service';
import { HelpersService } from './services/helpers.service';
import { MainRequestService } from './services/main-request.service';
import { MainService } from './services/main.service';
import { RoutingListService } from './services/routing-list.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CacheService,
    HelpersService,
    MainRequestService,
    MainService,
    RoutingListService
  ],
  declarations: [
  ]
})
export class CoreModule { }
