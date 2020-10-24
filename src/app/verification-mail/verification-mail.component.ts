import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-verification-mail',
  templateUrl: './verification-mail.component.html',
  styleUrls: ['./verification-mail.component.scss']
})
export class VerificationMailComponent implements OnInit {

  userData:any;
  formattedEmail:string;
  constructor(private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user'));
    console.log(this.userData);
    this.formattedEmail = this.getFormatted()
  }
  verificationMail(){
    this.auth.verificationMail();
  }
  getFormatted(){
    let spl = this.userData.email.split("@");
    let len = spl[0];
    let arr = [0,len-2,len-1];
    let formatted = spl[0].split('').map( (x,i) => arr.indexOf(i) > -1 ? x : '*' ).join('');
    return formatted+ "@" +spl[1];
  }
  logOut(){
    this.auth.signOut();
  }

}
