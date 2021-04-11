import { TestBed } from '@angular/core/testing';

import { TranslateWpRoutesService } from './translate-wp-routes.service';

describe('TranslateWpRoutesService', () => {
  let service: TranslateWpRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateWpRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
