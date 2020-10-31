import { Component, OnInit, Inject, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { fromEvent, timer } from 'rxjs'
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email:string='';
  password:string='';
  loginGroup:FormGroup;
  @ViewChild('login') loginButton:ElementRef;
  constructor(private authenticate:AuthenticationService,private router:Router,private fb:FormBuilder) {
    this.loginGroup = fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,]]
    })
   }
 


  signIn(){
    const {email,password} = this.loginGroup.getRawValue();
    this.authenticate.signIn(email,password);
    // this.emptyData();
  }

  check(){
    if(!this.loginGroup.invalid){
      this.signIn()
    }
  }

  signUp(){
    this.router.navigate(['signUp'])
  }

  verificationMail(){
    this.authenticate.verificationMail();
  }

  

  signOut(){
    this.authenticate.signOut();
  }

}
