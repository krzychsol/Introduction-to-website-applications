import { Component, Input, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { Tour } from '../tour/tour.component';
import { LocalService } from '../local.service';
import { DbService } from '../db.service';
import { map } from 'rxjs/operators';

export interface CartElement {
  [x: string]: any;
  tourKey: string,
  id: number,
  name: string,
  money: number,
  elements: number
}




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: CartElement[] = [];

  constructor(private cartSerivce: DbService) {
    
  }

  cartSum(){
    let res = 0;
    for(let c of this.cart) res += c.money * c.elements;
    return res;
    
  }

  ngOnInit(): void {
    this.cart = this.cartSerivce.getCartList();
  }

}