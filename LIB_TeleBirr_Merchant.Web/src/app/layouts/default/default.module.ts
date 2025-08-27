import{NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';




import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatPseudoCheckbox, MatPseudoCheckboxModule, MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


import { SharedModule } from 'app/shared/shared.module';
import { DefaultComponent } from './default.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon'
import { LoginComponent } from 'app/modules/login/login.component';

import { NavComponent } from 'app/modules/nav/nav.component';
import { ExportAsModule } from 'ngx-export-as';

import { ChangePasswordComponent } from 'app/modules/change-password/change-password.component';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    DefaultComponent,
    LoginComponent,
    NavComponent,
    ChangePasswordComponent,
    
  ],
  imports: [
   
    CommonModule,
    RouterModule,
    FormsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule ,
    MatButtonModule,
    MatRadioModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatToolbarModule,
 MatPseudoCheckboxModule,
 MatNativeDateModule,
 MatDatepickerModule,
 MatSlideToggleModule,
 MatMenuModule,
 MatSidenavModule,
 MatDividerModule,
 FlexLayoutModule,
 MatCardModule,
 MatPaginatorModule,
 MatTableModule,
 SharedModule,
 ExportAsModule,
  DatePipe,
  MatProgressSpinnerModule,
  BrowserAnimationsModule,
  ToastrModule.forRoot({
    timeOut: 30000,
    positionClass: 'toast-top-right',
    closeButton: true,
    progressBar: true
  })
     // Initialize the toastr module 

  ],

providers: [

],
})
export class DefaultModule { }
