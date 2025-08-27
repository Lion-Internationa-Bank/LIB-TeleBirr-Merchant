import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/service/auth.service';
import { TransactionService } from 'app/service/transaction.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TeleBirrMerchantService } from '../services/tele-birr-merchant.service';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-tele-birr-merchant-request',
  templateUrl: './tele-birr-merchant-request.component.html',
  styleUrls: ['./tele-birr-merchant-request.component.css']
})
export class TeleBirrMerchantRequestComponent {
  merchantShortCode:any;
  merchantName ='';
  loading=false;
  TeleBirrMerchantRequestForm:FormGroup;
  transactionType=1;
  canrequest=false;
  customerbranch='';
  customername='';
  private filterAccountSubject: Subject<string> = new Subject<string>();
  private filterAccount='';
  constructor(public _teleBirrMerchantService:TeleBirrMerchantService,
            private toastr: ToastrService,
            private transactionService: TransactionService,
            private authService: AuthService,
            private ngxService: NgxUiLoaderService,
            private fb: FormBuilder){
              this.createForm();
            this.filterAccountSubject.pipe(debounceTime(1600)).subscribe(usr =>this.checkAccount());
  }

  createForm(){
    this.TeleBirrMerchantRequestForm = this.fb.group({
      libcustomeracctno:[''],
      customerbranch:[''],
      amt:['',Validators.required],
      MerchantName:['',],
      customerName:[''],
      });
  }
  getMerchantbyShortCode(){
    this.merchantName='';
    this.loading =true;
    this.ngxService.start('getMerchantbyShortCode');
    if(this.merchantShortCode == '' || this.merchantShortCode == undefined){
      this.loading =false;
      this.ngxService.stop('getMerchantbyShortCode');
      this.toastr.error('Please Insert Merchant ShortCode');
      return;
    } 
    this._teleBirrMerchantService.merchantNameCheck(this.merchantShortCode).subscribe(
      res=>{
        if(!res.success){
          this.toastr.error(res.message);
        }
       
        else {
          this.merchantName = res.merchantName;
          this.TeleBirrMerchantRequestForm.controls['MerchantName'].setValue(this.merchantName);
        }
        this.loading =false;
        this.ngxService.stop('getMerchantbyShortCode');
      },
      error=> {
        this.loading =false;
        this.ngxService.stop('getMerchantbyShortCode');
        this.toastr.error('Something Wrong Please Try Again');
      }
    )
  }

  getLibCashAccountBalance(){
    this.ngxService.start('getLibCashAccountBalance');
    let amount = parseInt(this.TeleBirrMerchantRequestForm.controls['amt'].value)
    let branchId = this.authService.getbranch();
    this._teleBirrMerchantService.libaccountchecklibCash(branchId).subscribe(
      res=>{
        if(res.balance == undefined || res.balance == null){
          this.toastr.error(res.message);
          this.ngxService.stop('getLibCashAccountBalance');
          return;
        }
        else if(res.balance < amount){
          this.toastr.error('There is no Enough Amount On Cash Account');
          this.canrequest = false;
          return
        }
        this.canrequest = true;
        this.ngxService.stop('getLibCashAccountBalance');
      }, error=> {
        this.ngxService.stop('getLibCashAccountBalance');
      }
     )
   
  }

  SaveRequest(){
     if(this.transactionType ==1){
      this.saveTeleBirrMerchantTransactionTransfer();
     } else if(this.transactionType ==2){
      this.saveAwachTransactionCash();
     }
  }

  amtChange(){
    this.canrequest = false;
  }

  saveAwachTransactionCash(){
    this.loading=true;
    this.ngxService.start('saveAwachTransactionCash');
     let customerAmmount = this.TeleBirrMerchantRequestForm.controls['amt'].value;
    // let customerAccountNo = this.AwachRequestForm.controls['libcustomeracctno'].value;
    // let customerbranch = this.AwachRequestForm.controls['customerbranch'].value;
    let MerchantName = this.TeleBirrMerchantRequestForm.controls['MerchantName'].value;
    let request ={
      email:this.authService.getuser(),
      branch:this.authService.res.branch,
      // libcustomeracctno:customerAccountNo,
      creatorbranchid:this.authService.getbranch(),
      // customerbranch:customerbranch,
      amt: customerAmmount,
      awchName:MerchantName,
      IpAddress:''
    }
    // this._teleBirrMerchantService.postAwachTransactionCash(request).subscribe(
    //   res => {
    //     this.ngxService.stop('saveAwachTransactionCash');
    //     if(res.message == 'Cash Transaction initiation is done'){
    //     this.loading=false;
    //     this.ngxService.stop('saveAwachTransactionCash');
    //      this.toastr.success(res.message);
    //      this.reset();
    //     } else {
    //       this.toastr.error(res.message);
    //     }
        
    //   },
    //   error => {
    //     this.toastr.error('Something Wrong Please Try Again');
    //     this.loading=false;
    //     this.ngxService.stop('saveAwachTransactionCash');
    //     this.reset();
    //   }
    // )
  }

  saveTeleBirrMerchantTransactionTransfer(){
    this.loading=true;
    this.ngxService.start('saveTeleBirrMerchantTransactionTransfer');
    let customerAmmount = this.TeleBirrMerchantRequestForm.controls['amt'].value;
    let customerAccountNo = this.TeleBirrMerchantRequestForm.controls['libcustomeracctno'].value;
    let customerbranch = this.TeleBirrMerchantRequestForm.controls['customerbranch'].value;
    let MerchantName = this.TeleBirrMerchantRequestForm.controls['MerchantName'].value;
    let CustomerName = this.TeleBirrMerchantRequestForm.controls['customerName'].value;
    let request ={
      identifier: this.merchantShortCode,
      accountDebited:customerAccountNo,
      customerBranch:customerbranch,
      amount: customerAmmount,
      merchantName: MerchantName,
      transactionType: 'Transfere',
      approvedBy: this.authService.getuser(),
      customerName:CustomerName,
      branch: this.authService.getbranch(),
      branchName: this.authService.getbranchName(),
    }
    this._teleBirrMerchantService.postTeleBirrMerchantTransactionTransfer(request).subscribe(
      res => {
        this.toastr.success(res.message);
        this.loading=false;
        this.ngxService.stop('saveTeleBirrMerchantTransactionTransfer');
        this.reset();

      },
      error => {
        this.toastr.error('Something Wrong Please Try Again');
        this.loading=false;
        this.ngxService.stop('saveTeleBirrMerchantTransactionTransfer');
        this.reset();
      }
    )
  }

  checkCustomerBalance(){
    debugger
    this.ngxService.start('checkCustomerBalance');
    let customerAmmount = this.TeleBirrMerchantRequestForm.controls['amt'].value;
    let customerAccountNo = this.TeleBirrMerchantRequestForm.controls['libcustomeracctno'].value;
    let customerbranch = this.TeleBirrMerchantRequestForm.controls['customerbranch'].value;
    let MerchantName = this.TeleBirrMerchantRequestForm.controls['MerchantName'].value;
    let CustomerName = this.TeleBirrMerchantRequestForm.controls['customerName'].value;
    
    let simulationRequest ={
      identifier: this.merchantShortCode,
      accountDebited:customerAccountNo,
      customerBranch:customerbranch,
      amount: customerAmmount,
      merchantName: MerchantName,
      transactionType: 'Transfere',
      approvedBy: this.authService.getuser(),
      customerName:CustomerName,
      branch: this.authService.getbranch(),
      branchName: this.authService.getbranchName(),

    }
    this._teleBirrMerchantService.SimulateLIBTransfer(simulationRequest).subscribe(res=>{
       if(!res.success){
         this.toastr.error(res.message);
       }
       else{
        this.toastr.success('Has Enough Amount');
        this.canrequest=true;
       }
       this.ngxService.stop('checkCustomerBalance');
    }, errr => {
      this.ngxService.stop('checkCustomerBalance');
      this.toastr.error('Something Wrong please try again')
    })
  }
  customeracctnoChange(){
    // let customerAccountNo = this.TeleBirrMerchantRequestForm.controls['libcustomeracctno'].value;
    // this.filterAccount= customerAccountNo;
    // this.filterAccountSubject.next(customerAccountNo); // Emit the latest value
    this.checkAccount();
  }
  checkAccount() {
    this.loading=true;
    this.ngxService.start('checkAccount');
    let customerAccountNo = this.TeleBirrMerchantRequestForm.controls['libcustomeracctno'].value;
    if(!customerAccountNo) {
      this.loading=false;
      this.ngxService.stop('checkAccount');
      return
    };
    debugger
    this._teleBirrMerchantService.LibaccountchecklibTransfer(customerAccountNo).subscribe(response => {
      debugger;
      this.loading=false;
      this.ngxService.stop('checkAccount');
      debugger
      if (response) {

        this.customerbranch =response.branch
        this.customername =  response.fullname
        this.TeleBirrMerchantRequestForm.controls['customerbranch'].setValue(this.customerbranch);
        this.TeleBirrMerchantRequestForm.controls['customerName'].setValue(this.customername);
      } else {
        this.TeleBirrMerchantRequestForm.controls['customerbranch'].setValue('');
        this.TeleBirrMerchantRequestForm.controls['customerName'].setValue('');
        this.toastr.error('Account Does not Exist');
      }
    }, error => {
      console.error('Error checking account:', error);
      this.loading=false;
      this.ngxService.stop('checkAccount');
      this.TeleBirrMerchantRequestForm.controls['customerbranch'].setValue('');
      this.TeleBirrMerchantRequestForm.controls['customerName'].setValue('');
      this.TeleBirrMerchantRequestForm.controls['libcustomeracctno'].setValue('');
    });
  }

  reset(){
    this.TeleBirrMerchantRequestForm.reset();
    this.transactionType=0;
    this.canrequest=false;
    this.customerbranch='';
    this.merchantShortCode=undefined;
    this.merchantName ='';
  }
  transactionTypeChange(){
    this.TeleBirrMerchantRequestForm.reset();
    this.canrequest=false;
    this.customerbranch='';
    this.merchantShortCode=undefined;
    this.merchantName ='';
  }

  checkAccountBalance(){
    if(this.transactionType ==1){
      this.checkCustomerBalance();
    }
    else if(this.transactionType ==2){
      this.getLibCashAccountBalance();
    }
  }

}

