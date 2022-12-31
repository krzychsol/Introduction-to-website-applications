import { TestBed } from '@angular/core/testing';

import { TourDetailsGuard } from './tour-details.guard';

describe('DishDetailsGuard', () => {
  let guard: TourDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TourDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
