import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ReportAuthGuardService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.getrole() == "Finance"||this.authService.getrole() == "0078"||this.authService.getrole() == "0017"||this.authService.getrole() == "0041"||this.authService.getrole() == "0048"||this.authService.getrole() == "0049") {
  
      return true;
    } 
    else {
      // Redirect to ItComponent for non-admin users
      this.router.navigate(['user/:id/It']);
      return false;
    }
    
  }
}
