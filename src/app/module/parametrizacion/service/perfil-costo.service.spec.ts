import { TestBed } from '@angular/core/testing';

import { PerfilCostoService } from './perfil-costo.service';

describe('PerfilCostoService', () => {
  let service: PerfilCostoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PerfilCostoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
