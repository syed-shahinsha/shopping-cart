import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs'
import { AuthenticationService } from '../services/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements AfterViewInit {
  email:string='';
  password:string='';
  @ViewChild('login') loginButton:ElementRef;
  constructor(private authenticate:AuthenticationService) { }
 

  ngAfterViewInit(): void {
    fromEvent(this.loginButton.nativeElement,'click').subscribe((res)=>{
     this.signIn(this.email,this.password);
    })
  }

  signIn(email,password){
    this.authenticate.signIn(email,password);
    this.emptyData();
  }

  emptyData():void{
    this.email= this.password = '';
  }

  verificationMail(){
    this.authenticate.verificationMail();
  }

  signUp(){
    this.authenticate.signUp(this.email,this.password);
    this.emptyData();
  }

  signOut(){
    this.authenticate.signOut();
  }

}
