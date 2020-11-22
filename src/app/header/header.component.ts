import { Component, OnInit, HostListener } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  imgsrc: string = '';
  username: string = 'user!';

  constructor(private auth:AuthenticationService, private afs:AngularFireStorage) {

   }

  async ngOnInit(): Promise<void> {
    const logo = await this.afs.ref('logo/sh_logo_with_name_white.svg').getDownloadURL().toPromise();
    this.imgsrc = logo;
    this.username = JSON.parse(localStorage.getItem('user'))['email'];

  } 

  logOut(){
    this.auth.signOut();
  }

  @HostListener('window:scroll',['$event'])
   headerScroll(eve){
     console.log(eve);
   }

}
