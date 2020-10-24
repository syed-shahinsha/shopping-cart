import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit,AfterViewInit {
  email:string='';
  password:string='';
  repassword:string='';
  @ViewChild('login') loginButton:ElementRef;
  constructor(private authenticate:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    fromEvent(this.loginButton.nativeElement,'click').subscribe((res)=>{
     this.signUp();
    })
  }
  signUp(){
    this.authenticate.signUp(this.email,this.password).then(r =>{
      this.router.navigate(['verifymail']);
    });
    this.emptyData();
  }
  loginPage(){
    this.router.navigate(['login'])
  }
  emptyData():void{
    this.email= this.password = '';
  }

}
