import { TestBed } from '@angular/core/testing';

import { ModaljsonService } from './modaljson.service';

describe('ModaljsonService', () => {
  let service: ModaljsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModaljsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
