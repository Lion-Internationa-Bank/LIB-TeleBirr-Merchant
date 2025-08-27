import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeleBirrMerchantRoutingModule } from './tele-birr-merchant-routing.module';
import { TeleBirrMerchantRequestComponent } from './tele-birr-merchant-request/tele-birr-merchant-request.component';
import { TeleBirrMerchantApprovalComponent } from './tele-birr-merchant-approval/tele-birr-merchant-approval.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TeleBirrMerchantReportComponent } from './tele-birr-merchant-report/tele-birr-merchant-report.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';


@NgModule({
  declarations: [
    TeleBirrMerchantRequestComponent,
    TeleBirrMerchantApprovalComponent,
    TeleBirrMerchantReportComponent
  ],
  imports: [
    CommonModule,
    TeleBirrMerchantRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatRadioModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class TeleBirrMerchantModule { }
