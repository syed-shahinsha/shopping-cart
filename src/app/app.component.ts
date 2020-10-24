import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import  { filter } from 'rxjs/operators';
import { Location } from '@angular/common';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'shopping-cart';
  constructor(private router:Router,private location:Location,private auth:AuthenticationService){
    this.router.events.pipe(filter(x => x instanceof NavigationEnd)).subscribe(x =>{
      this.location.replaceState("");
    });
  }
}
