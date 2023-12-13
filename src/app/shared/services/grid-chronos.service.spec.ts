import { TestBed } from '@angular/core/testing';

import { GridChronosService } from './grid-chronos.service';

describe('GridChronosService', () => {
  let service: GridChronosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridChronosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
