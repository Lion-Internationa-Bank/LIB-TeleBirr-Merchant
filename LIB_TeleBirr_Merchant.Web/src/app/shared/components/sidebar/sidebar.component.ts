
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/service/auth.service';
import { SidebarService } from 'app/service/sidebar.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/Approval', title: 'Approve',  icon: '', class: '' },
    // { path: '/MpesaApproval', title: 'MpesaApprove',  icon: '', class: '' },
    // { path: '/FanaReport', title: 'Fana-Report',  icon: '', class: '' },
    // { path: '/BranchReport', title: 'Fana-Report',  icon: '', class: '' },
    // { path: '/Request', title: 'Request',  icon: '', class: '' },
    // { path: '/MpesaRequest', title: 'MpesaRequest',  icon: '', class: '' },
    // { path: '/IfrsApproval', title: 'RTGS-Approve',  icon: '', class: '' },
    // { path: '/RtgsReport', title: 'RTGS and Atm-Report',  icon: '', class: '' },
    // { path: '/IfrsRequest', title: 'RTGS-Request',  icon: '', class: '' },
    // { path: '/RtgsAllReport', title: 'Rtgs-Atm All Report',  icon: '', class: '' },
    // { path: '/Change', title: 'Change',  icon: '', class: '' },
    // { path: '/FanaCustom', title: 'Fana-Custom-Report',  icon: '', class: '' },
    // { path: '/awach/AwachRequest', title: 'Awach Request',  icon: '', class: '' },
    // { path: '/awach/AwachApproval', title: 'Awach Approval',  icon: '', class: '' },
    // { path: '/awach/AwachReport', title: 'Awach Report',  icon: '', class: '' },
    { path: '/telebirr-merchant/Request', title: 'telebirr request',  icon: 'assignment_add', class: '' },
    { path: '/telebirr-merchant/Approval', title: 'telebirr approval',  icon: 'check', class: '' },
    { path: '/telebirr-merchant/Report', title: 'telebirr report',  icon: 'print', class: '' },
  

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})



export class SidebarComponent implements OnInit {
  menuItems: any[];
  display:boolean=false;
  role
  constructor(public authService: AuthService,
    public sidebarService: SidebarService,
    private router:Router,
  ) {
    this.menuItems = [];
  }


  
user:String;
ngOnInit() {
debugger
if(!this.authService.isitAuthenticated()) return;

 

  this.role = this.authService.getrole();
  this.user = this.authService.getuser();

  const services = this.authService.Services|| []; // Services array
  this.menuItems = []; // Start with an empty menuItems array

  if (this.authService.isitAuthenticated()) {
    this.display = true; // Allow navigation if user is authenticated
  }
  // Role-specific menu item generation
  if (this.role === '0041' || this.role === '0048' || this.role === '0049') {
  this.menuItems.push(...ROUTES.filter(menuItem => menuItem.path === '/telebirr-merchant/Approval'));
    // Approval roles
    // if (services.includes('MPESA')) {
    //   this.menuItems.push(...ROUTES.filter(menuItem => menuItem.path === '/MpesaApproval'||menuItem.path === '/MpesaReport'));
    // }
    // if (services.includes('Fana')) {
    //   this.menuItems.push(...ROUTES.filter(menuItem =>
    //     menuItem.path === '/Approval' || menuItem.path === '/BranchReport'
    //   ));
    // }
    // if (services.includes('Awach')) {
    //   this.menuItems.push(...ROUTES.filter(menuItem => menuItem.path === '/awach/AwachApproval'||menuItem.path === '/awach/AwachReport'));
      
    // }
  } else if (this.role === '0052') {
      this.menuItems.push(...ROUTES.filter(menuItem => menuItem.path === '/telebirr-merchant/Request'));
//  || this.role === '0073' || this.role === '0017'
    // Request roles
  //   if (services.includes('MPESA')) {
  //     this.menuItems.push(...ROUTES.filter(menuItem => menuItem.path === '/MpesaRequest'));
  //   }
  //   if (services.includes('Fana')) {
  //     this.menuItems.push(...ROUTES.filter(menuItem => menuItem.path === '/Request'));
  //   }
  //   if (services.includes('Awach')) {
  //     this.menuItems.push(...ROUTES.filter(menuItem => menuItem.path === '/awach/AwachRequest'));
  // }
   } 
   
    if (this.role === '0078' || this.role === '0052' || this.role === '0041' || this.role === '0048' || this.role === '0049') {
  this.menuItems.push(...ROUTES.filter(menuItem => menuItem.path === '/telebirr-merchant/Report'));
  //   // Report roles
  //   if (services.includes('MPESA')) {
  //     this.menuItems.push(...ROUTES.filter(menuItem => menuItem.path === '/MpesaReport'));
  //   }
  //   if (services.includes('Fana')) {
  //     this.menuItems.push(...ROUTES.filter(menuItem => menuItem.path === '/FanaReport'));
  //   }
  //   if (services.includes('Awach')) {
  //     this.menuItems.push(...ROUTES.filter(menuItem => menuItem.path === '/awach/AwachReport'));
  //   }
  } 
  else {
    debugger
     this.router.navigate(['/unauthorized']);
  }
  // else if (this.role === 'Admin') {
  //   this.menuItems = []; // No routes for Admin
  // } else if (this.role === 'FanaAdmin') {
  //   this.menuItems = ROUTES.filter(menuItem => menuItem.path === '/FanaCustom');
  // } else if (this.role === 'Finance') {
  //   this.menuItems = ROUTES.filter(menuItem => menuItem.path === '/RtgsAllReport');
  // }
}



  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
