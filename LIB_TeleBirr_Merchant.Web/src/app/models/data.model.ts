


export interface Login {
  id: number;
  branch: string;
 fullName: string;
  userName: string;
  password: String;
  role: String;
  branchCode:string
  updatedBy:string;
  updatedDate:String;
  status:string,
 

}
export interface TokenResponse {
  token: string;
userData:{
  id: number;
  branch: string;
 fullName: string;
  userName: string;
  password: String;
  role: string;
  branchCode:string
  updatedBy:string;
  updatedDate:String;
  status:string
}  

}

export interface UserData {
  branch:number;
   branchName:number;
   userName:number ;
  fullName:string;
  role :string;
  createdDate:string; 
  updatedDate :string;
status:string

}
export interface Report {
  AccountNo:number;
   SerialNo:number;
   MemberCode:number ;
  MemberType:string;
  TransactionDate :string;
  AccountHolderName:string; 
  AccountType :string;
  Debit :number;
  Credit :number;
  Balance :number;
  BBF :number;
 UnAuthorized :string;
 SiteCode:number ;

}
export interface Transfer {
  id:number,
  memberId: string;
depositorPhone: string;
  amount: number;
  transType:string;
  transDate:string;
  createdBy:string;
  approvedBy:string;
  status:string;
  updatedDate:string;
  updatedBy:string;
  cAccountBranch: string,
  cAccountNo: string,
  cAccountOwner: string,
  dAccountNo: string,
  dDepositeName: string,
 branch: string,
  referenceNo: string,
  messsageNo: string,
  paymentNo: string,

}

export interface ValidAccount {
  customer_Id: string;
  fulL_NAME: string;
  accountNumber: string;
  branch: string;
  telephonenumber: string;

}
export interface IfrsTransfer {

    updatedDate: string,
    updatedBy: string,
    status: string,
    id: number,
    inputing_Branch: string,
    transaction_Date:string,
    account_No: string,
    amount1: number,
     phone_No :string,
     address :string,
     tinNo :string,
     debitor_Name :string,
     paymentMethod :string,
    refno: string,
    branch: string,
    cAccountNo: string,
    createdBy: string,
    approvedBy: string,
    messsageNo: string,
    paymentNo: string,
    paymentType: string
    serviceFee: number,    
    serviceFee2: number,
    vat: number,
    vat2: number
}

export interface FanaTransactions {


  ncp: string;                // CHAR(11), nullable
  customeR_NAME: string;      // CHAR(67), nullable
  sen: string;                // CHAR(1), nullable
  lib: string;                // CHAR(30), nullable
  dco: string;                  // DATE, nullable
  age: string;                // CHAR(5), nullable
  agsa: string;               // CHAR(5), nullable
  mon: number;                // NUMBER, nullable
  eve: string;                // CHAR(6), nullable
  ope: string;                // CHAR(3), nullable
  pie: string;                // CHAR(11), nullable
  r_NO: number;               // NUMBER (integer), nullable
  shi: number;                // NUMBER(19,4), nullable
  typ: string;                // CHAR(10), nullable
  cha: string;                // CHAR(3), nullable
  noseq: number;              // NUMBER(10), nullable
  uti?: string;                // CHAR(10), nullable
  uta?: string;                // CHAR(10), nullable
  debit?: number;              // NUMBER, nullable
  credit?: number;             // NUMBER, nullable
  runninG_TOTAL: number;      // NUMBER, nullable

}

export interface OutRtgs {



    inputinG_BRANCH: string,
    transactioN_DATE:string,
    accounT_NO: string,
    amounT1: number,
    refno: string,

 }
 

 export interface MpesaTransfer {
  id:number,
  agentId: string;
depositorPhone: string;
  amount: number;
  transType:string;
  transDate:string;
  createdBy:string;
  approvedBy:string;
  status:string;
  updatedDate:string;
  updatedBy:string;
  cAccountBranch: string,
  cAccountNo: string,
  cAccountOwner: string,
  dAccountNo: string,
  dDepositeName: string,
 branch: string,
  referenceNo: string,
  messsageNo: string,
  paymentNo: string,

}

export interface MpesaReport {
  id: string; // Unique identifier for the transaction
  trnno: string; // Transaction number
  Agent_Code: string; // Agent's code
  Agent_Lib_Acct: string; // Agent's library account
  Mpesa_Lib_Acct: string; // Mpesa library account
  Amount: number; // Transaction amount
  Date: string; // Transaction date in ISO format
  Trn_Type: string | null; // Transaction type (nullable)
  msg: string; // Message or reference ID
  CreatedBy: string; // User who created the record
  Creater_Branch_Code: string; // Branch code of the creator
  Role: string; // Role of the user
  Agent_Lib_Branch: string; // Agent's library branch
  AuthorizedBy: string; // User who authorized the transaction
  LibrequestId: string; // Unique request ID in the library system
  Wuser: string; // Possibly a web user (nullable or empty)
  IpAddress: string; // IP address of the transaction source
  PrintStatus: string; // Print status (e.g., "Not Printed")
  ReferrenceId: string; // Reference ID for the transaction
}
