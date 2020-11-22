import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImagePath, DocumentPath } from './add-product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductGroup: FormGroup ;
  
  tempImageArray: any[] = [];
  setUniversalUserId: string = '';
  constructor(private fb: FormBuilder, private route:ActivatedRoute , private storage: AngularFireStorage, private firestore: AngularFirestore) { }

  ngOnInit(): void {
    this.addProductGroup = this.getGroupData();
    this.route.queryParams.subscribe(res =>{
      if(res && res.docId){
        this.setUniversalUserId = res.docId;
        this.firestore.doc(`${DocumentPath}${this.setUniversalUserId}`).get().subscribe(res =>{
           this.addProductGroup = this.getGroupData(res.data());
        })
      }else{
        this.setUniversalUserId = this.firestore.createId();
      }
    })
  }

  getGroupData(data?){
    const form = this.fb.group({
      name: [data ? data.name : '', [Validators.required]],
      category: [data ? data.category : '', [Validators.required]],
      description: [data ? data.description : '', [Validators.required]],
      quantity: [data ? data.quantity : null, [Validators.required]],
      price: [data ? data.price : null, [Validators.required]],
      availability: [data ? data.availability : null, [Validators.required]],
      photos: this.fb.array([]),
    })

    if(data && data.photos && data.photos.length){
      data.photos.forEach((x)=>{
        form.get('photos')['controls'].push(this.getPhotoPath(x));
      }) 
    }
    return form;
  }

  getPhotoPath(data){
    return this.fb.group({
      name:[ data ? data.name:''],
      fullPath:[ data ? data.fullPath:''],
      downloadURL:[ data ? data.downloadURL:'']
    })
  }
  deletePhoto(path:string){
    const samplePhotos = this.addProductGroup.get('photos').value;
    this.storage.ref(path).delete().subscribe(r=>{
      this.addProductGroup.get('photos').setValue([]);
        samplePhotos.filter( x => x.fullPath !== path).forEach((y)=>{
          (this.addProductGroup.get('photos') as FormArray).push(y)
        })
      
    })
  }
  deletePhotoTemp(path:string){
    const samplePhotos = this.tempImageArray;
    this.storage.ref(path).delete().subscribe(r=>{
      this.tempImageArray = [];
        samplePhotos.filter( x => x.fullPath !== path).forEach((y)=>{
          this.tempImageArray.push(y)
        })
      
    })
  }

  addProduct() {
    console.log("testing....")
  }
  async setToFormValue(eve) {
    //  this.addProductGroup.get('photos').setValue(eve.target.files);
    const uid = this.firestore.createId();
    let photos: FileList = eve.target.files;
    console.log(photos.length);
    const fileList = Array(photos.length).fill(null).map((_, i) => photos.item(i));
    const showFiles = fileList.map(x => ({ path: `${ImagePath}${uid}/${x.name}`, data: x }))
    console.log(showFiles);
    const resArray = await Promise.all(showFiles.map(async x => {
      const task = await this.storage.upload(x.path, x.data)
      // return.then(pass => Promise.resolve(pass)))
      const refer = task.ref;
      const { name, fullPath } = refer;
      const downloadURL = await refer.getDownloadURL()
      return { name, fullPath, downloadURL };
    }));
    this.tempImageArray = [...this.tempImageArray, ...resArray.filter(photo => !!photo)]
    console.log(this.tempImageArray)
  }


  async addProductForTesting() {
    const uid = this.setUniversalUserId;
    const obj = this.addProductGroup.getRawValue();
    obj.photos = [...obj.photos,...this.tempImageArray];
    await this.firestore.doc(`${DocumentPath}${uid}`).set(obj);
    console.log('Done check now');
  }
}
