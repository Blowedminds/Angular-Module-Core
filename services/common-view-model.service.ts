import {Injectable} from '@angular/core';
import {MainViewModelService} from './main-view-model.service';
import {CacheService} from './cache.service';
import {MainRequestService} from './main-request.service';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../user/models';
import {EducationField, EducationLevel} from '../models';

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
    return this.cacheService.get('common.user.profile',
      this.requestService.makeGetRequest('user.profile').pipe(
        map(response => new User(response)
        )
      )
    );
  }

  educationFields(): Observable<EducationField[]> {
    return this.cacheService.get('common.education.fields',
      this.requestService.makeGetRequest('core.education.fields')
    );
  }

  educationLevels(): Observable<EducationLevel[]> {
    return this.cacheService.get('common.education.levels',
      this.requestService.makeGetRequest('core.education.levels')
    );
  }
}
