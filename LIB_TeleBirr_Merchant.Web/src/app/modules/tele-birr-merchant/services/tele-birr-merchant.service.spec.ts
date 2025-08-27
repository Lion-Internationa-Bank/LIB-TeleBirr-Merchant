import { TestBed } from '@angular/core/testing';

import { TeleBirrMerchantService } from './tele-birr-merchant.service';

describe('TeleBirrMerchantService', () => {
  let service: TeleBirrMerchantService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TeleBirrMerchantService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
