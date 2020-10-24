import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import { Observable } from 'rxjs';

@Injectable()
export class VerifiedAuthGuard implements CanActivate,CanLoad {
  
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let user = this.authService.isVerfiedJSON();
    if(user.loggedIn) {
      user.verified ? this.router.navigate(['landingpage']) : this.router.navigate(['login'])
    }else{
        this.router.navigate(['login'])
    }
    return true;
  }

  canLoad(route:Route): Observable<boolean> | Promise<boolean> | boolean {
    let user = this.authService.isVerfiedJSON();
    if(user.loggedIn) {
        user.verified ? this.router.navigate(['landingpage']) : this.router.navigate(['login'])
    }else{
        this.router.navigate(['login'])
    }
      return true;
  }

}