import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { fruitListMatchGuard } from './fruit-list-match.guard';

describe('fruitListMatchGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => fruitListMatchGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
