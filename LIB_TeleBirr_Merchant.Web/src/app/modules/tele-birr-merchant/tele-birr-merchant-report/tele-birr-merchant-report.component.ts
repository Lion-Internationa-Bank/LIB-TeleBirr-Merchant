import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TeleBirrMerchantService } from '../services/tele-birr-merchant.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'app/service/auth.service';

@Component({
  selector: 'app-tele-birr-merchant-report',
  templateUrl: './tele-birr-merchant-report.component.html',
  styleUrls: ['./tele-birr-merchant-report.component.css']
})
export class TeleBirrMerchantReportComponent implements AfterViewInit{
  displayedColumns: string[] = ['accountDebited', 'merchantName','identifier', 'amount',  'createdDate', 'status', 'Action'];
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
    status:['Approved']
    });
  }

  getTransaction(){
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



  searchTransaction(){
    this.ngxService.start('searchTransaction');
    let params ={
      AccountNo: this.TransactionSearchForm.controls.AccountNo.value,
      DateFrom: this.TransactionSearchForm.controls['DateFrom'].getRawValue()?.toDateString(),
      DateTo: this.TransactionSearchForm.controls['DateTo'].getRawValue()?.toDateString(),
      Status: this.TransactionSearchForm.controls.status.value,
      Branch: this.authservice.getbranch()
    }
    this.teleBirrMerchantService.getApprovedMerchantTransaction(params).subscribe(
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
  print(transaction): void {
  const transTypeText = transaction.transactionType === 'Cash' ? 'Cash Deposit Saving' : 'Account to Account Transfer';
  const transDate = new Date(transaction.approvedDate);
  const dateOptions: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' };
  const timeOptions: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit', hour12: false };
  const formattedDate = transDate.toLocaleDateString('en-GB', dateOptions);
  const formattedTime = transDate.toLocaleTimeString('en-GB', timeOptions);

  const printContent = `
    <div>
      
    <img src="/assets/img/LIBLogo2.jpg" class="logo-img" />
    <span class="slip-title">LION INTERNATIONAL BANK S.C</span>
          <p>Date : ${formattedDate} at ${formattedTime}</p>
        <div> <h6 class="cooperative-name"> Transaction Type: Bank to telebirr (${transaction.merchantName})</h6>
        <p class="currency">Branch .....: ${transaction.branchName}</p>
        <p class="teller">Authorized By .....: ${transaction.approvedBy}</p>

        

        <div class="slip-section">
          <p>Debit Account Owner .....: ${transaction.customerName}</p>
          <p>Debit Account No .....: ${transaction.accountDebited}</p>
          <p>telebirr Merchant Short Code ......: ${transaction.identifier}</p>
          <p>telebirr Merchant Name ......: ${transaction.merchantName}</p>
          <p>Transaction Type ......: ${transaction.transactionType}</p>
          <p>Lib Transaction Id ......: ${transaction.cbsTransactionId ?? ''}</p>
          <p>telebirr Transaction Id ......: ${transaction?.telebirrTransactionId ?? ''}</p>

            <p>Credit Account Owner .....: telebirr</p>   
            <p>Credit Account Number .....: 22100300001</p>  
            <p>Amount .....: ${Number(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ETB</p>
          <p>Transaction Date .....: ${formattedDate} at ${formattedTime}</p>
        </div>
      </div>



      <div class="clear"></div>
    </div>
    
  `;


  const img = new Image();
  img.src = '/assets/img/LIBLogo2.jpg';
  img.onload = () => {
    const WindowPrt = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(`
      <html>
        <head>
          <title>Print</title>
        <style>
            body { margin: 0; font-family: 'Courier New', Courier, monospace;  font-size: 14px; }
            .approval-slip { max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #000; }
                  .header { display: flex; align-items: center; justify-content: center; }
            .logo-img { width: 100%; height: 10%; margin-left: 120px; }
            .slip-title, .cooperative-name, .branch, .date, .teller { font-size: 14px; font-weight: normal; color: black; }
            .slip-divider { border: 0; height: 1px; background: #000; margin: 3px 0; }
            .slip-section { box-sizing: border-box; padding: 5px; }
            .slip-section p { margin: 3px 0; text-align: left; }
            .clear { clear: both; }
            .right-align { text-align: right; }
            .left-section { float: left; width: 50%; }
            .right-section { float: left; width: 50%; margin-top:27%}
            
            .slip-title span{ text-align: center; font-size: 16px; font-weight: bold;}
           
            .date {
        text-align: right;
        font-size: 14px;

        font-family: 'Courier New', Courier, monospace;
      }
        .logo-img{
        width:10%;
        height: 5%;
          }
                </style>
              </head>
              <body>
                ${printContent}
              </body>
            </html>
    `);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  };
}


}

