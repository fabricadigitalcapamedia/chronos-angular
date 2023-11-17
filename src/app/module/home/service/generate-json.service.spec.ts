import { TestBed } from '@angular/core/testing';

import { GenerateJsonService } from './generate-json.service';

describe('GenerateJsonService', () => {
  let service: GenerateJsonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateJsonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
