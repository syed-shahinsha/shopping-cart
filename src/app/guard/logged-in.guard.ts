import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { AuthenticationService } from "../services/authentication.service";
import { Observable } from 'rxjs';

@Injectable()
export class LoggedInAuthGuard implements CanActivate,CanLoad {
  
  constructor(
    public authService: AuthenticationService,
    public router: Router
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn() !== true) {
      this.router.navigate(['login'])
    }
    return true;
  }

  canLoad(route:Route): Observable<boolean> | Promise<boolean> | boolean {
    if(this.authService.isLoggedIn() !== true) {
        this.router.navigate(['login'])
      }
      return true;
  }

}