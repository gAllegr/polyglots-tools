import { TestBed } from '@angular/core/testing';
import { LocaleResolver } from './locale.resolver';

describe('LocaleResolver', () => {
  let resolver: LocaleResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(LocaleResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
