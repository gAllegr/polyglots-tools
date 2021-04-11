import { TestBed } from '@angular/core/testing';

import { StringRetrieverService } from './string-retriever.service';

describe('StringRetrieverService', () => {
  let service: StringRetrieverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringRetrieverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
