import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeleBirrMerchantRequestComponent } from './tele-birr-merchant-request/tele-birr-merchant-request.component';
import { TeleBirrMerchantApprovalComponent } from './tele-birr-merchant-approval/tele-birr-merchant-approval.component';
import { TeleBirrMerchantReportComponent } from './tele-birr-merchant-report/tele-birr-merchant-report.component';

const routes: Routes = [
  {path:'Request', component:TeleBirrMerchantRequestComponent},
  {path:'Approval', component:TeleBirrMerchantApprovalComponent},
  {path:'Report', component: TeleBirrMerchantReportComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeleBirrMerchantRoutingModule { }
