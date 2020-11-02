import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  addProductGroup: FormGroup
  constructor() { }

  ngOnInit(): void {
  }

  addProduct(){
    console.log("testing....")
  }
}
