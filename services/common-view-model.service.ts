import {Injectable} from '@angular/core';
import {MainViewModelService} from './main-view-model.service';
import {CacheService} from './cache.service';
import {MainRequestService} from './main-request.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonViewModelService extends MainViewModelService {

  constructor(
    protected cacheService: CacheService,
    protected requestService: MainRequestService
  ) {
    super(cacheService, requestService);
  }

  user(): Observable<any> {
    return this.cacheService.get('user.profile', this.requestService.makeGetRequest('user.profile'));
  }
}
