import { Injectable } from '@angular/core';
import { CacheService } from './cache.service';
import { MainRequestService } from './main-request.service';
import {HelperService} from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class MainViewModelService {

  constructor(
    protected cacheService: CacheService,
    protected requestService: MainRequestService
  ) { }
}
