import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  prodObs : AngularFirestoreCollection<any>;
  products : Observable<any>;
  constructor(private afs:AngularFirestore) {
    this.prodObs = afs.collection<any>('Product');
    this.products = this.prodObs.valueChanges();
   }
  
  ngOnInit(): void {
    // this.products.get("Product")._subscribe((res)=>{
    //   console.log(res);
      
  }

}
