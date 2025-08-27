import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardSecondService implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.getrole() == "0048" ||this.authService.getrole() == "0041"||this.authService.getrole() == "0049") {
  
      return true;
    } 
   
    else {
      // Redirect to ItComponent for non-admin users
       this.router.navigate(['/'])
      return false;
    }
    
  }
  

  

}
