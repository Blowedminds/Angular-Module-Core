import { TestBed, inject } from '@angular/core/testing';

import { HelperService } from './helper.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HelpersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelperService],
      imports: [
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([HelperService], (service: HelperService) => {
    expect(service).toBeTruthy();
  }));
});
