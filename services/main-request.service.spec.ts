import { TestBed, inject } from '@angular/core/testing';

import { MainRequestService } from './main-request.service';
import { HttpClientModule } from '@angular/common/http';
import { HelperService } from './helper.service';
import { RoutingListService } from 'src/app/auth/imports';
import { RouterTestingModule } from '@angular/router/testing';

describe('MainRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MainRequestService,
        HelperService,
        RoutingListService,
      ],
      imports: [
        HttpClientModule,
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([MainRequestService], (service: MainRequestService) => {
    expect(service).toBeTruthy();
  }));
});
