import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  prodObs : AngularFirestoreCollection<any>;
  products : Observable<any>;
  constructor(private afs:AngularFirestore, private san:DomSanitizer, private storage: AngularFireStorage, private router: Router) {
    this.prodObs = afs.collection<any>('product');
    this.products = this.prodObs.valueChanges({idField:'documentId'})
    
   }
  
  safehtml(image){
    return this.storage.ref(image).getDownloadURL();
  }
  editProduct(data){
    this.router.navigate(['addProduct'], { queryParams : { docId: data.documentId}});
  }

  ngOnInit(): void {
      this.products.subscribe(res =>{
       console.log(res);
      })
  }

  openProductPage(){
    this.router.navigate(['addProduct']);
  }

}
