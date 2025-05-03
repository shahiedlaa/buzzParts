import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { logResolver } from './log.resolver';

describe('logResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => logResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
