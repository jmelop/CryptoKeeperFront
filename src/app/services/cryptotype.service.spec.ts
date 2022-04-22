import { TestBed } from '@angular/core/testing';

import { CryptoTypeService } from './cryptotype.service';

describe('CryptoTypeService', () => {
  let service: CryptoTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
