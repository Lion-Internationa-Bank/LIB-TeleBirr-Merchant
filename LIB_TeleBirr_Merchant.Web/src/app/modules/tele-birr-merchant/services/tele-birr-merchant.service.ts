import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiUrlService } from 'app/service/apiurl.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeleBirrMerchantService {

 constructor(public httpclient: HttpClient,
               public apiUrl: ApiUrlService) { }
 
               
   private readonly _merchantNameCheckUrl: string = 'api/TeleBirrMerchant/MerchantNameCheck';
   private readonly _libaccountchecklibCashUrl: string = '/LibaccountchecklibCash';
   private readonly _getPendingMerchantTransactionUrl: string = 'api/TeleBirrMerchant/GetPendingMerchantTransactionList';
   private readonly _postAwachTransactionTransferUrl: string = 'api/TeleBirrMerchant/CreateMerchantTransfere';
   private readonly _approveMerchantTransactionUrl: string = 'api/TeleBirrMerchant/ApproveMerchantTransfere';
   private readonly _postCancelAwachRequestUrl: string = '/PostCancelAwachRequest';
   private readonly _postAwachTransactionApprovedUrl: string = '/postAwachTransactionApproved';
   private readonly _LibaccountchecklibTransferUrl: string = 'api/TeleBirrMerchant/getAccountBranch';
   private readonly _getCompletedTransactionUrl: string = '/getCompletedTransaction';
   private readonly _SimulateLIBTransferUrl: string = 'api/TeleBirrMerchant/SimulateLIBTransfer';
   private readonly _rejectMerchantTransactionUrl: string = 'api/TeleBirrMerchant/RejectMerchantTransfere';
   
   private readonly _getApprovedMerchantTransactionUrl: string = 'api/TeleBirrMerchant/GetApprovedMerchantTransactionList';
 
 
  //  private readonly header = new HttpHeaders({
  //    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiTUVBWkFIIiwiTVBFU0EiOiJ0cnVlIiwiQXdhY2giOiJ0cnVlIiwiRmFuYSI6InRydWUiLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJDb3JlVXNlciIsImV4cCI6MTczMjg4NzYwMCwiaXNzIjoiaHR0cHM6Ly9sb2NhbGhvc3Q6NzI0MCIsImF1ZCI6Imh0dHBzOi8vbG9jYWxob3N0OjQyMDAifQ.Xu-j-lJjQy0iUwLTDhZvqrb0Ycnp1i8UGUnNpXAVrlE`,
  //    'Content-Type': 'application/json'
  //  });
   get merchantNameCheckUrl() {
     return this.apiUrl.apiTeleBirrUrl + this._merchantNameCheckUrl;
   }
 
   get libaccountchecklibCashUrl() {
     return this.apiUrl.apiTeleBirrUrl + this._libaccountchecklibCashUrl;
   }
 
   get getPendingMerchantTransactionUrl() {
     return this.apiUrl.apiTeleBirrUrl + this._getPendingMerchantTransactionUrl;
   }

   get getApprovedMerchantTransactionUrl() {
     return this.apiUrl.apiTeleBirrUrl + this._getApprovedMerchantTransactionUrl;
   }
 
   get postAwachTransactionTransferUrl() {
     return this.apiUrl.apiTeleBirrUrl + this._postAwachTransactionTransferUrl;
   }
 
   get approveMerchantTransactionUrl() {
     return this.apiUrl.apiTeleBirrUrl + this._approveMerchantTransactionUrl;
   }
 
   get postCancelAwachRequestUrl() {
     return this.apiUrl.apiTeleBirrUrl + this._postCancelAwachRequestUrl;
   }
 
   get postAwachTransactionApprovedUrl() {
     return this.apiUrl.apiTeleBirrUrl + this._postAwachTransactionApprovedUrl;
   }
 
   get LibaccountchecklibTransferUrl() {
     return this.apiUrl.apiTeleBirrUrl + this._LibaccountchecklibTransferUrl;
   }
 
   get getCompletedTransactionUrl() {
     return this.apiUrl.apiTeleBirrUrl + this._getCompletedTransactionUrl;
   }

   get getSimulateLIBTransferUrl() {
    return this.apiUrl.apiTeleBirrUrl + this._SimulateLIBTransferUrl;
  }

  get getRejectMerchantTransactionUrl() {
    return this.apiUrl.apiTeleBirrUrl + this._rejectMerchantTransactionUrl;
  }
 
   merchantNameCheck(merchantShortCode: string):Observable<any>{
    //  let headers = this.header
     return this.httpclient.get(`${this.merchantNameCheckUrl}/${merchantShortCode}`)
   }
 
   libaccountchecklibCash(creatorbranchid: string):Observable<any>{
    //  let headers = this.header
     return this.httpclient.post(this.libaccountchecklibCashUrl,{creatorbranchid:creatorbranchid})
   }
 
   getPendingMerchantTransaction(searchParam):Observable<any>{
    //  const headers = new HttpHeaders({
    //        'Content-Type': 'application/json',
    //        Authorization: `Bearer ${this.authservice.token}`, 
    //      });
         const param = new HttpParams()
         .append('AccountNo', searchParam.AccountNo != undefined ? searchParam.AccountNo : '')   
         .append('DateFrom', searchParam?.DateFrom)
         .append('DateTo', searchParam?.DateTo)
         .append('Status', searchParam.Status != undefined ? searchParam.Status : '0')
         .append('Branch', searchParam?.Branch)
     return this.httpclient.get(this.getPendingMerchantTransactionUrl,{params: param})
   }
   getApprovedMerchantTransaction(searchParam):Observable<any>{
    //  const headers = new HttpHeaders({
    //        'Content-Type': 'application/json',
    //        Authorization: `Bearer ${this.authservice.token}`, 
    //      });
         const param = new HttpParams()
         .append('AccountNo', searchParam.AccountNo != undefined ? searchParam.AccountNo : '')   
         .append('DateFrom', searchParam?.DateFrom)
         .append('DateTo', searchParam?.DateTo)
         .append('Status', searchParam.Status != undefined ? searchParam.Status : '0')
         .append('Branch', searchParam?.Branch)
     return this.httpclient.get(this.getApprovedMerchantTransactionUrl,{params: param})
   }
 
   postTeleBirrMerchantTransactionTransfer(TransactionTransfereRequest):Observable<any>{
    //  let headers = this.header
     return this.httpclient.post(this.postAwachTransactionTransferUrl,TransactionTransfereRequest)
   }
 
   approveMerchantTransaction(Id: string):Observable<any>{
    //  let headers = this.header
     return this.httpclient.post(`${this.approveMerchantTransactionUrl}/${Id}`,{})
   }
 
   postCancelAwachRequest(id: string):Observable<any>{
    //  let headers = this.header
     return this.httpclient.post(this.postCancelAwachRequestUrl,{id:id})
   }
 
   postAwachTransactionApproved(approverequest):Observable<any>{
    //  let headers = this.header
     return this.httpclient.post(this.postAwachTransactionApprovedUrl,approverequest)
   }
 
   LibaccountchecklibTransfer(customerno):Observable<any>{
    return this.httpclient.get(`${this.LibaccountchecklibTransferUrl}/${customerno}`)
   }
 
   getCompletedTransaction(branchid):Observable<any> {
    //  let headers = this.header
     return this.httpclient.post(this.getCompletedTransactionUrl,{branchid:branchid})
   }

   SimulateLIBTransfer(simulationRequest):Observable<any> {
    return this.httpclient.post(`${this.getSimulateLIBTransferUrl}`, simulationRequest)
   }

   rejectMerchantTransaction(id):Observable<any> {
    return this.httpclient.get(`${this.getRejectMerchantTransactionUrl}/${id}`)
   }
 
 }