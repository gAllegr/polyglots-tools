import { TestBed } from '@angular/core/testing';
import { PwaHelperService } from './pwa-helper.service';

describe('PwaHelperService', () => {
  let service: PwaHelperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PwaHelperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
