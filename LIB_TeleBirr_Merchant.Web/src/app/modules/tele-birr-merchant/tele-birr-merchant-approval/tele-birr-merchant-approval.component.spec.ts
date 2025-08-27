import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleBirrMerchantApprovalComponent } from './tele-birr-merchant-approval.component';

describe('TeleBirrMerchantApprovalComponent', () => {
  let component: TeleBirrMerchantApprovalComponent;
  let fixture: ComponentFixture<TeleBirrMerchantApprovalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeleBirrMerchantApprovalComponent]
    });
    fixture = TestBed.createComponent(TeleBirrMerchantApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
