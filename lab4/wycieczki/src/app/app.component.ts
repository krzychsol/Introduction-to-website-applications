import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CartComponent, CartElement } from './cart/cart.component';
import { Tour } from './tour/tour.component';
import {tours} from './tours'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  
  title = 'ex7';
  toursData: Tour[]= tours;
  bookedTours: number = 0;
  maxPriceId: number;
  minPriceId: number;
  showSidebar: boolean = true;

  cart: CartElement[] = [];
  cartSum: number = 0;

  constructor() {
    this.toursData = tours;
    this.minPriceId = 0;
    this.maxPriceId = 0
    this.setMinMax();
    
  }

  setMinMax() {
    this.maxPriceId = this.toursData[0].id;
    let maxMoney = this.toursData[0].money;
    this.minPriceId = this.toursData[0].id;
    let minMoney = this.toursData[0].money;
    for(let t of this.toursData) {
        if(t.money < minMoney) {
          minMoney = t.money;
          this.minPriceId = t.id;
        }
        if(t.money > maxMoney) {
          maxMoney = t.money;
          this.maxPriceId = t.id;
        }
    }
  }

  ngAfterViewInit(): void {
  }

  addToBasket(e: Tour){
    this.bookedTours += 1;
    this.cartSum += e.money;
    let is = false;
    for(let c of this.cart) {
      if(c.id == e.id) {
        c.elements += 1;
        is = true;
      }
    }
    if(!is) {
      this.cart.push({
        id: e.id,
        name: e.name,
        money: e.money,
        elements: 1
      });
    }
  }

  removeFromBasket(e: Tour){
    this.bookedTours -= 1;
    this.cartSum -= e.money;
    for(let c = 0; c < this.cart.length; c++) {
      if(this.cart[c].id == e.id) {
        this.cart[c].elements -= 1;
        if(this.cart[c].elements == 0) {
          this.cart.splice(c, 1);
        }
      }
    }
  }

  deleteTour(e: number) {
    this.setMinMax();
  }

  addTour(e: Tour) {
    e.id = this.toursData[this.toursData.length - 1].id + 1;
    this.toursData.push(e);
    this.setMinMax()
  }

  setMinMax2(tab: number[]) {
    if(tab.length == 0) return;
    this.maxPriceId = this.toursData[tab[0]].id;
    let maxMoney = this.toursData[tab[0]].money;
    this.minPriceId = this.toursData[tab[0]].id;
    let minMoney = this.toursData[tab[0]].money;
    for(let t of this.toursData) if(tab.includes(t.id)){
        if(t.money < minMoney) {
          minMoney = t.money;
          this.minPriceId = t.id;
        }
        if(t.money > maxMoney) {
          maxMoney = t.money;
          this.maxPriceId = t.id;
        }
    }
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
  }
}
