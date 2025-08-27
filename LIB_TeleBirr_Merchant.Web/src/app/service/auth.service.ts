import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
import { Observable, throwError, timer } from 'rxjs';
import { catchError, switchMap, takeWhile } from 'rxjs/operators';
import { Login } from 'app/models/data.model';
import { TransactionService } from './transaction.service';
import { SidebarService } from './sidebar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { disableDebugTools } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated: boolean = false;
  public Role: string;
  public Services: string;
  public name: string;
  public branch: string;
  public branchname: string;
  public id: number;
  public password: String;
  public res: Login;
  public incorrect: boolean = false;
  public suspended: boolean = false;
  public roleincorrect: boolean = false;
  public locked:boolean=false;
  public message:string="";
  public mustchangepassword:boolean=false
  token:string;

  newUser: Login = {
    id: 0,
    branch: "",
    fullName: "",
    userName: "",
    password: "",
    role: "",
    branchCode: "",
    updatedBy: "",
    updatedDate: "",
    status: "",
  };

  constructor(
    private loginService: LoginService,
    private router: Router,
    private sidebarService:SidebarService,
    private ngxService: NgxUiLoaderService,
    private transactionService: TransactionService
  ) {}

  login(username: string, password: string) {
    this.ngxService.start();
    this.loginService.login(username, password).subscribe({
      next: (response) => {
        this.ngxService.stop();
        if (response && response.success) {

      
          // Store token and user data in local storage
          localStorage.setItem('token', response.token);
          this.token=response.token;
        


            localStorage.setItem('userData', JSON.stringify({
            branch: response.branch,
            branchCode: response.branchCode,
            role: response.role,
            services: response.services,
          }));
          this.startTokenExpirationTimer();
           //   this.sidebarService.updateSidebarData(this.getUserData());
          console.log("test",response)
          // Set user details in the component

          this.name = username;
          this.branch = response.branchCode;
          this.branchname = response.branch;
          this.Role = response.role;
          this.Services=response.services;
 

       
          // Navigate based on role
          this.redirectBasedOnRole(response.role,response.services);
          console.log("response.mustChangePassword",response.mustChangePassword)
          if (response.mustChangePassword) {
            // Redirect to the Change Password page
            this.mustchangepassword=true;
           this.name=username;
            this.router.navigate(['/Change']);
            return;
          }
        } else {
          this.message=response.message;
          // setTimeout(() => this.message="", 2000);
          console.error('Login failed: Invalid response format',response);
        }
      },
      error: (err) => {
       this.ngxService.stop();
        console.error('Login error:', err);
        this.incorrect = true;
        this.message='Login Error';
        // setTimeout(() => this.message="", 2000);
        // setTimeout(() => this.resetStatusFlags(), 1000); // Reset after 1 second
      },
    });
  }
  



  // redirectBasedOnRole(role: string) {
  //   this.tra=true;
  //   switch (role) {
  //     case 'Admin':
  //       this.router.navigate(['/Admin']);
  //       break;
  //     case 'FanaAdmin':
  //       this.router.navigate(['/FanaCustom']);
  //       break;
  //     case 'Finance':
  //       this.router.navigate(['/RtgsAllReport']);
  //       break;
  //     case '0052':
  //     case '0073':
  //     case '0017':
  //       this.router.navigate(['/Request']);
  //       break;
  //     case '0048':
  //     case '0041':
  //     case '0049':
  //       this.router.navigate(['/Approval']);
  //       break;
  //     case '0078':
  //       this.router.navigate(['/FanaReport']);
  //       break;
  //     default:
  //       console.error('Role not recognized:', role);
  //       this.roleincorrect = true;
  //       break;
  //   }
  // }
  

  redirectBasedOnRole(role: string, services: string[]) {
    if(role == ''){
      role = this.getrole();
    }
    // Define navigation routes for services
    const serviceRoutes = {
      // MPESA: {
      //   Request: '/MpesaRequest',
      //   Approval: '/MpesaApproval',
      //   Report: '/MpesaReport',
      // },
      // Fana: {
      //   Request: '/Request',
      //   Approval: '/Approval',
      //   Report: '/FanaReport',
      // },
      // Awach: {
      //   Routerequest: '/awach/AwachRequest',
      //   Approval: '/awach/AwachApproval',
      //   Report: '/awach/AwachReport',
      // },
      TeleBirr:{
        Request: '/telebirr-merchant/Request',
        Approval: '/telebirr-merchant/Approval',
        Report: '/telebirr-merchant/Report',
      }
    };
  
    // Check the services and route accordingly
    const navigateToServiceRoute =
     (service: string, routeType: 'Request' | 'Approval' | 'Report') => {
      if (serviceRoutes[service]) {
        this.router.navigate([serviceRoutes[service][routeType]]);
      } else {
        console.error(`Service '${service}' not recognized`);
      }
    };
  
    switch (role) {
      // case 'Admin':
      //   this.router.navigate(['/Admin']);
      //   break;
      // case 'FanaAdmin':
      //   this.router.navigate(['/FanaCustom']);
      //   break;
      // case 'Finance':
      //   this.router.navigate(['/RtgsAllReport']);
      //   break;
      case '0052': // Request roles
      // case '0073':
      // case '0017':
        // if (services.includes('MPESA')) {
        //   navigateToServiceRoute('MPESA', 'Request');
        // } else if (services.includes('Fana')) {
        //   navigateToServiceRoute('Fana', 'Request');
        // } else if (services.includes('Awach')) {
        //   navigateToServiceRoute('Awach', 'Request');
        // } else if (services.includes('ViewDocument')) {
          navigateToServiceRoute('TeleBirr', 'Request');
        // }
        break;
      case '0048': // Approval roles
      case '0041':
      case '0049':
        // if (services.includes('MPESA')) {
        //   navigateToServiceRoute('MPESA', 'Approval');
        // } else if (services.includes('Fana')) {
        //   navigateToServiceRoute('Fana', 'Approval');
        // } else if (services.includes('Awach')) {
        //   navigateToServiceRoute('Awach', 'Approval');
        // } else if (services.includes('ViewDocument')) {
          navigateToServiceRoute('TeleBirr', 'Approval');
        // }
        break;
      case '0078': 
       case '0048': // Approval roles
      case '0041':
      case '0049':// Report roles
        // if (services.includes('MPESA')) {
        //   navigateToServiceRoute('MPESA', 'Report');
        // } else if (services.includes('Fana')) {
        //   navigateToServiceRoute('Fana', 'Report');
        // } else if (services.includes('Awach')) {
        //   navigateToServiceRoute('Awach', 'Report');
        // } else if (services.includes('ViewDocument')) {
          navigateToServiceRoute('TeleBirr', 'Report');
        // }
        break;
      default:
        console.error('Role not recognized:', role);
        this.roleincorrect = true;
         this.router.navigate(['/unauthorized']);
        break;
    }
  }
  

  // getUserData() {
  //   const role = this.getrole();
  //   const branch = this.getbranch();
  //   const user = this.getuser();

  //   return this.transactionService.getUserDetails(branch, user, role);
  // }

  // getincorrect(): boolean {
  //   return this.incorrect;
  // }

  getTokenData(): any{
    const token = localStorage.getItem('token');
    if(!token) return;
    let data =JSON.parse(atob(token.split('.')[1]))
    if(!data['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']  || !data?.BranchCode || !data?.Branch){
      this.logout();
    } else 
     return data;
  }

  getrole(): string {
    const userData = this.getTokenData();
    return userData?.CBSrole;
  }

  getbranch(): string {
    const userData = this.getTokenData();
    return userData?.BranchCode;
  }
  getbranchName(): string {
    const userData = this.getTokenData();
    return userData?.Branch;
  }
  
  getuser(): string {
     const userData = this.getTokenData();
     return userData['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
  }

  getid(): number {
    return this.id;
  }

  getpassword(): String {
    return this.password;
  }

  getres(): Login {
    this.res = JSON.parse(localStorage.getItem('userData'));
    return this.res;
  }

  logout(): void {
    localStorage.removeItem('token');
     localStorage.removeItem('userData');
    this.isAuthenticated = false;
    this.Role = '';
    this.router.navigate(['/login']);
  }

  isitAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  private startTokenExpirationTimer(): void {
    const token = localStorage.getItem('token');
    if (!token) return;

    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      console.error('Invalid token format');
      return;
    }

    const payload = JSON.parse(atob(tokenParts[1]));
    if (!payload || !payload.exp) {
      console.error('Expiration time not found in token payload');
      return;
    }

    const expirationTime = payload.exp * 1000; // Convert expiration time to milliseconds
    const currentTime = Date.now();
    const adjustedExpirationTime = currentTime + (15 * 60 * 1000); // 15 minutes from now
    const timeUntilExpiration = Math.max(adjustedExpirationTime - currentTime, expirationTime - currentTime);
    
    timer(timeUntilExpiration)
      .pipe(takeWhile(() => this.isitAuthenticated()))
      .subscribe(() => {
        this.logout();
      });
  }

  private resetStatusFlags(): void {
    this.incorrect = false;
    this.locked = false;
    this.suspended = false;
    this.roleincorrect = false;
  }
}
