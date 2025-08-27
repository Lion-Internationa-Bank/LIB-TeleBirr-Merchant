import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './modules/login/login.component';

import { NavComponent } from './modules/nav/nav.component';

//import { ToastrModule } from 'ngx-toastr';
import {  NgxUiLoaderModule, NgxUiLoaderRouterModule, SPINNER} from 'ngx-ui-loader';
import {ngxUiLoaderConfig} from './shared/NgxUiLoaderConfig'
import { ConfirmationDialogModule } from './shared/components/confirmation-dialog/confirmation-dialog.module';
import { AuthInterceptor } from './modules/tele-birr-merchant/interceptors/auth.interceptor';




@NgModule({
  declarations: [
    AppComponent,

  






  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DefaultModule,
    HttpClientModule,
    
    NgxUiLoaderModule.forRoot({
      bgsType: SPINNER.threeStrings,
    }),
    NgxUiLoaderRouterModule,
    ConfirmationDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }

 

