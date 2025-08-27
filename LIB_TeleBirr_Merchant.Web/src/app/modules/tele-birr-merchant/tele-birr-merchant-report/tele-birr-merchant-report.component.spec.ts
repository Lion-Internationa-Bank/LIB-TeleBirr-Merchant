import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeleBirrMerchantReportComponent } from './tele-birr-merchant-report.component';

describe('TeleBirrMerchantReportComponent', () => {
  let component: TeleBirrMerchantReportComponent;
  let fixture: ComponentFixture<TeleBirrMerchantReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeleBirrMerchantReportComponent]
    });
    fixture = TestBed.createComponent(TeleBirrMerchantReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
