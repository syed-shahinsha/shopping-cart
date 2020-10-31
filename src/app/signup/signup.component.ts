import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PasswordValidator } from './password-validator.form';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit,AfterViewInit {
  signUpGroup:FormGroup;
  @ViewChild('login') loginButton:ElementRef;
  minCharacters:number = 8;
  constructor(private authenticate:AuthenticationService,private router:Router,private fb:FormBuilder) { 
  }

  ngOnInit(): void {
    this.signUpGroup = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(8)]],
      confirmPassword:['',Validators.required,Validators.minLength(8)]
    }, { validators: PasswordValidator.passwordMatch})
  }
  ngAfterViewInit(): void {
    fromEvent(this.loginButton.nativeElement,'click').subscribe((res)=>{
     this.signUp();
    })
  }
  signUp(){
    const {email,password}  = this.signUpGroup.getRawValue();
    this.authenticate.signUp(email,password).then(r =>{
      this.router.navigate(['verifymail']);
    });
  }
  loginPage(){
    this.router.navigate(['login'])
  }
  

}
