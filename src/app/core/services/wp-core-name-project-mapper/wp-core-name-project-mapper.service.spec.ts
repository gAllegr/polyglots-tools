import { TestBed } from '@angular/core/testing';

import { WpCoreNameProjectMapperService } from './wp-core-name-project-mapper.service';

describe('WpCoreNameProjectMapperService', () => {
  let service: WpCoreNameProjectMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WpCoreNameProjectMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
