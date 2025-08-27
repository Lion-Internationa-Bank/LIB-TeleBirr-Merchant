import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TeleBirrMerchantService } from '../services/tele-birr-merchant.service';
import { AuthService } from 'app/service/auth.service';

@Component({
  selector: 'app-tele-birr-merchant-approval',
  templateUrl: './tele-birr-merchant-approval.component.html',
  styleUrls: ['./tele-birr-merchant-approval.component.css']
})
export class TeleBirrMerchantApprovalComponent implements AfterViewInit{
  displayedColumns: string[] = ['accountDebited', 'merchantName','identifier', 'amount',  'createdDate', 'Action'];
  dataSource = new MatTableDataSource([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  TransactionSearchForm:FormGroup;
   selection = new SelectionModel(true, []);

  constructor(private teleBirrMerchantService :TeleBirrMerchantService,
              private ngxService: NgxUiLoaderService,
              private fb: FormBuilder,
              private toaster:ToastrService,
              private authservice: AuthService,
              private _teleBirrMerchantService:TeleBirrMerchantService){
  
   this.TransactionSearchForm = fb.group({
    AccountNo:[],
    DateFrom:[new Date()],
    DateTo:[new Date()],
    status:['0']
    });
  }

  getPendingTransaction(){
    this.ngxService.start('getReversalListForFinance');
    this.teleBirrMerchantService.getPendingMerchantTransaction({}).subscribe(
      res => {
         this.dataSource = new MatTableDataSource(res);
         this.dataSource.paginator = this.paginator;
         this.ngxService.stop('getReversalListForFinance');
      }, error =>{
        this.toaster.error("Please try again");
        this.ngxService.stop('getReversalListForFinance');
      }
    )
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  approveTrans(id){
    this.ngxService.start('createtransfere');
    this.teleBirrMerchantService.approveMerchantTransaction(id).subscribe(
      res => {
        if(res.success){
          this.toaster.success(res.message);
        } else{
          this.toaster.error(res.message);
        }
        
        this.searchTransaction();
        this.ngxService.stop('createtransfere');
      }, error =>{
        this.toaster.error("Unable to Made Approval Successfully!");
        this.ngxService.stop('createtransfere');
      }
    )
  }

  searchTransaction(){
    this.ngxService.start('searchTransaction');
    let params ={
      AccountNo: this.TransactionSearchForm.controls.AccountNo.value,
      DateFrom: this.TransactionSearchForm.controls['DateFrom'].getRawValue()?.toDateString(),
      DateTo: this.TransactionSearchForm.controls['DateTo'].getRawValue()?.toDateString(),
      Status: this.TransactionSearchForm.controls.status.value,
      Branch: this.authservice.getbranch()
    }
    this.teleBirrMerchantService.getPendingMerchantTransaction(params).subscribe(
      res => {
         this.dataSource = new MatTableDataSource(res);
         this.dataSource.paginator = this.paginator;
         this.ngxService.stop('searchTransaction');
      },
      error =>{
        this.toaster.error("Please try again");
        this.ngxService.stop('searchTransaction');
      }
    )
  }

  rejectTrans(id){
    this.ngxService.start('rejectTrans');
    this.teleBirrMerchantService.rejectMerchantTransaction(id).subscribe(
      res => {
        this.toaster.error("The request reject succesfully");
        this.getPendingTransaction();
        this.ngxService.stop('rejectTrans');
      }, error =>{
        this.toaster.error("Unable Reject the record");
        this.ngxService.stop('rejectTrans');
      }
    )
  }

}
