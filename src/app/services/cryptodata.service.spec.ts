import { TestBed } from '@angular/core/testing';

import { CryptoDataService } from './cryptodata.service';

describe('CryptodataService', () => {
  let service: CryptoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CryptoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
