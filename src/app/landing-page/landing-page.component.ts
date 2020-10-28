import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  prodObs : AngularFirestoreCollection<any>;
  products : Observable<any>;
  constructor(private afs:AngularFirestore, private san:DomSanitizer, private storage: AngularFireStorage) {
    this.prodObs = afs.collection<any>('product');
    this.products = this.prodObs.valueChanges();
    
   }
  
  safehtml(image){
    //return this.san.bypassSecurityTrustResourceUrl(image);
    return this.storage.ref(image).getDownloadURL()
  } 

  ngOnInit(): void {
      
  }

}
