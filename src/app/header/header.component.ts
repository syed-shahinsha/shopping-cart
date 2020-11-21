import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private auth:AuthenticationService, private afs:AngularFireStorage) { }

  ngOnInit(): void {
  } 

  logOut(){
    this.auth.signOut();
  }

  @HostListener('window:scroll',['$event'])
   headerScroll(eve){
     console.log(eve);
   }

}
