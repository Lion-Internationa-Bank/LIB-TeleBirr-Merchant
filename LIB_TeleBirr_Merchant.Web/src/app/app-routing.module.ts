import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuardService } from './service/auth-guard.service';
import { AdminAuthGuardService } from './service/admin-auth-guard.service';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';

import { AdminAuthGuardSecondService } from './service/admin-auth-guard-second.service';
import { AdminAuthAdminGuardService } from './service/admin-auth-admin-guard.service';
import { UnAuthorizedComponent } from './shared/components/un-authorized/un-authorized.component';
 // Create this component for 404 page

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: DefaultComponent,
    canActivate: [AuthGuardService],
    children: [
      { path: 'Change', component: ChangePasswordComponent },
    //   {
    //     path: 'Request',
    //     component: TransferRequestComponent,
    //     canActivate: [AdminAuthGuardService]
    //   },
    //   {
    //     path: 'Approval',
    //     component: TransferAprovalComponent,
    //     canActivate: [AdminAuthGuardSecondService]
    //   },
    //   {
    //     path: 'IfrsRequest',
    //     component: IFRSRequestComponent,
    //     canActivate: [AdminAuthGuardService]
    //   },
    //   {
    //     path: 'IfrsApproval',
    //     component: IFRSApprovalComponent,
    //     canActivate: [AdminAuthGuardSecondService]
    //   },
    //   {
    //     path: 'Admin',
    //     component: AdminComponent,
    //     canActivate: [AdminAuthAdminGuardService],
    //   },
    //   {
    //     path: 'FanaReport',
    //     component: FanaReportComponent,
    //     canActivate: [ReportAuthGuardService],
    //   },
    //   {
    //     path: 'GeneralReport',
    //     component: GeneralReportComponent,
    //     canActivate: [ReportAuthGuardService],
    //   },
    //   {
    //     path: 'BranchReport',
    //     component: BranchreportComponent,
    //     canActivate: [AdminAuthGuardSecondService],
    //   },
      
    //   {
    //     path: 'RtgsReport',
    //     component: IFRSReportComponent,
    //     canActivate: [AdminAuthGuardSecondService],
    //   },
    //   {
    //     path: 'RtgsAllReport',
    //     component: IFRSAllbranchReportComponent,
    //     canActivate: [ReportAuthGuardService],
    //   },
    //   {
    //     path: 'FanaCustom',
    //     component: FanaCustomViewComponent,
    //     canActivate: [CustomFanaAuthGuardService],
    //   },
    //   {
    //     path: 'Receipt',
    //     component: ReceiptComponent,
    //     canActivate: [AdminAuthGuardService],
    //   },
    //   {
    //     path: 'MpesaRequest',
    //     component: MpesaRequestComponent,
    //     canActivate: [AdminAuthGuardService]
    //   },
    //   {
    //     path: 'MpesaApproval',
    //     component: MpesaApprovalComponent,
    //     canActivate: [AdminAuthGuardSecondService]
    //   },
    //   {
    //     path: 'awach',
    //     // canActivate: [AdminAuthGuardService],
    //     loadChildren:()=>import('./modules/awach/awach.module').then(m=>m.AwachModule)
    //  },
     {
      path: 'telebirr-merchant',
      // canActivate: [AdminAuthGuardService],
      loadChildren:()=>import('./modules/tele-birr-merchant/tele-birr-merchant.module').then(m=>m.TeleBirrMerchantModule)
     },
     { path: 'unauthorized', component: UnAuthorizedComponent }
    ]
  },
  ,
  //  {
  //       path: 'awach',
  //       loadChildren:()=>import('./modules/awach/awach.module').then(m=>m.AwachModule)
  // },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
