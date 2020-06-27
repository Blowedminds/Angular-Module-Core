import { TestBed } from '@angular/core/testing';

import { CommonViewModelService } from './common-view-model.service';

describe('CommonViewModelService', () => {
  let service: CommonViewModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommonViewModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
