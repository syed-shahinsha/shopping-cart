import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import { Observable, never } from 'rxjs';

@Injectable()
export class LoggedInAuthGuard implements CanActivate,CanLoad {
  
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      let verify = this.authService.isVerfiedJSON();
    if(verify.loggedIn) {
    if(verify.verified){
      return true;
    }else{
      this.router.navigate(['verifymail'])
    }
    }else{
      this.router.navigate(['login'])
    }
    
  }

  canLoad(route:Route): Observable<boolean> | Promise<boolean> | boolean {
    let verify = this.authService.isVerfiedJSON();
    if(verify.loggedIn) {
    if(verify.verified){
      return true;
    }else{
      this.router.navigate(['verifymail'])
    }
    }else{
      this.router.navigate(['login'])
    }
  }

}