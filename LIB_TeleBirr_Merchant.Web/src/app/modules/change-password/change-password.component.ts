import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Login } from 'app/models/data.model';
import { AuthGuardService } from 'app/service/auth-guard.service';
import { AuthService } from 'app/service/auth.service';
import { LoginService } from 'app/service/login.service';
import { MpesaTransactionService } from 'app/service/Mpesatransaction.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  users:Login
  changed:boolean=false;
  showbutton:boolean=true;
  dosntmatch:boolean=false;
  error:string=""
  constructor(private authGuardService: AuthGuardService, 
              private router:Router,
              private renderer: Renderer2,
              private toastr: ToastrService,
              @Inject(DOCUMENT) private document: Document,
              private authService: AuthService, private mpesaService :MpesaTransactionService) {}
  buttons = [
   
  ];

  ngOnInit():void {
    this.check();
      }
      check(){
         if (this.authService.getres().role == "Admin") {
      
        return this.showbutton=false;
      }
      }

      showSuccessMessage(message: string, isError: boolean = false): void {
        if (isError) {
          console.log ("in")
          this.toastr.error(message, 'Error', {
            timeOut: 1000,
            positionClass: 'toast-top-right',
            closeButton: true
          });
        } else {
          console.log ("in")
          this.toastr.success(message, 'Success', {
            timeOut: 1000,
            positionClass: 'toast-top-right',
            closeButton: true
          });
        }
      }
     
      changePassword(): void {
        if (this.newPassword !== this.confirmPassword) {
          console.error('New password and confirm password do not match');
          this.showSuccessMessage('password do not match!',false);
          this.dosntmatch = true;
          setTimeout(() => {
            this.dosntmatch = false;
          }, 2000);
          return;
        }
      
        console.log('this.oldPassword', this.oldPassword);
        this.mpesaService.changePassword(this.oldPassword, this.newPassword).subscribe(
          response => {
            if (response.succeeded) {
              console.log('Password reset successful:', response);
              this.showSuccessMessage(' successfull !');
             this.router.navigate(['/login']);
     
              // this.authService.login(this.authService.name, this.newPassword)
              // this.oldPassword = "";
              // this.newPassword = "";
              // this.confirmPassword = "";
            } else {
              console.log('Password change failed:', response);
              if (response.errors) {
                if (response.errors[0]?.description === "Incorrect password") {
                  this.error = "Incorrect old password.";
                  this.showSuccessMessage('Incorrect old password!',false);
                } else {
                  this.error = response.errors[0]?.description || "Unknown error.";
                  this.showSuccessMessage('Unknown error!',false);
                }
                setTimeout(() => {
                  this.error = "";
                }, 2000);
              }
            }
          },
          error => {
            console.error('Failed to reset password:', error);
            this.error = "An unknown error occurred.";
            setTimeout(() => {
              this.error = "";
            }, 2000);
          }
        );
      }
      
     
    }
    