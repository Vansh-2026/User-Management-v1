import { Component, OnInit } from '@angular/core';
import { Products } from '../Services/products';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CommonModule],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  productList:any;
  constructor(private productService:Products){

  }
  ngOnInit():void{
    this.productService.getProductList().subscribe((data:any)=>{
      console.log(data);
      this.productList = data;
    });
  } 
}
