import { TestBed, inject } from '@angular/core/testing';

import { HelpersService } from './helpers.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('HelpersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HelpersService],
      imports: [
        RouterTestingModule
      ]
    });
  });

  it('should be created', inject([HelpersService], (service: HelpersService) => {
    expect(service).toBeTruthy();
  }));
});
