//import { identifierModuleUrl } from '@angular/compiler';
import { Injectable } from '@angular/core';
//import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { CrudService } from './service/crud.service';
import { map } from 'rxjs/operators';
import { CartComponent, CartElement } from './cart/cart.component';
import { FilterRanges } from './fliter/fliter.component';
import { Tour } from './tour/tour.component';
import { tours } from './tours';


@Injectable({
  providedIn: 'root'
})
export class DbService {
  
  private toursPath = 'tours';
  private cartPath = 'cart';
  //toursRef: Tour[] = [];
  //cartRef: AngularFireList<CartElement>;
  cart: CartElement[] = [];
  tours: Tour[] = [];
  toursWithFilters: number[] = [];

  constructor(private crudService: CrudService) {
    for(let i = 0; i <= 30; i++) this.toursWithFilters.push(i);
      this.crudService.getTours().subscribe(res => {
          this.tours = res as Tour[];
    })
    //this.cartRef = db.list(this.cartPath);
    this.updateLocalCartList();
    this.updateLocalTourList();
    
  }

  getToDisplayList(): number[] {
    return this.toursWithFilters;
  }
  getFreeID(): number {
    return this.tours[this.tours.length - 1].id + 1;
  }

  getToursLocalList(): Tour[] {
    //this.updateLocalTourList();
    return this.tours;
  }
  
  resetFilters() {
    this.toursWithFilters = [];
    for(let i = 0; i <= 30; i++) this.toursWithFilters.push(i);
  }


  applyFilters(filters: FilterRanges) {
    //console.log(filters);
    this.toursWithFilters = [];

    for(let t of this.tours) {
      if((filters.destinations.length == 0 || filters.destinations.includes(t.destination)) &&
        t.money >= filters.minMoney &&
        t.money <= filters.maxMoney &&
        (filters.ratings.length == 0  || filters.ratings.includes(t.rate)) &&
        (filters.dateBeg == "" || new Date(t.dateBegin) >= new Date(filters.dateBeg)) &&
        (filters.dateEnd == "" || new Date(t.dateEnd) <= new Date(filters.dateEnd))
      
      
      ){
        //t.display = true;
        this.toursWithFilters.push(t.id);
        //tab.push(t.id);
      } else {
        //t.display = false;
      }
    }
  }

  bookedTours() {
    let sum = 0;
    for(let c of this.cart) {
      sum += c.elements;
    }
    return sum;
  }


  getToursList()  {
    return this.tours;
  }

  deleteTour(key: string) {
      this.crudService.deleteTour(key).subscribe(res => {
      })

      for(let t of this.tours) {
        if(t.key === key) {
            this.tours.splice(t.id, 1);
            break;
          }
      }
    //this.toursRef.remove(key);
    //this.updateLocalCartList();
    //this.updateLocalTourList();
  }
  
  updateRate(key: string, value: any) {
    //this.toursRef.update(key, value);
      this.crudService.updateTour(key, value).subscribe(() => {
          console.log("Rate updated successfully!");
      })
  } 

  createTour(tour: Tour): void {
    //tour.id = this.tours[this.tours.length - 1].id + 1;
    //this.toursRef.push({...tour})
      this.crudService.addTour(tour).subscribe(() => {
          console.log("Tour created successfully!");
      })
    //this.updateLocalCartList();
    //this.updateLocalTourList();
  }

  getCartList()  {
    return this.cart;
  }

    updateLocalCartList() {
    /*
    this.cart.snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(cart =>{
      this.cart = cart as CartElement[];
    });*/
  }

    updateLocalTourList() {
      /*
    this.toursRef.snapshotChanges().pipe(
      map(changes => changes.map(c => ({key : c.payload.key, ...c.payload.val()})))
    ).subscribe(tour =>{
      this.tours = tour as Tour[];
      //for(let t of this.tours) if(!this.toursWithFilters.includes(t.id)) this.toursWithFilters.push(t.id);
    });*/
  }


  addToCart(tour: CartElement, el: number): void {
    //this.cart.push(tour)
    //console.log(tour);
    //console.log(this.cart);

    for (let c of this.cart) {
        if (c.id === tour.id) {
            c.elements += 1
            return;
        }
    }
    this.cart.push(tour);
    //(if(this.cart.includes(tour)) {
    //  this.cartRef.update(tour.key, { elements: tour.elements + 1 });
    //} else {
    //this.cartRef.push({...tour})
    //}
    
  }

  deleteFromCart(tour: CartElement, el: number): void {
    this.updateLocalCartList();
    //console.log(tour);
    //console.log(this.cart);

    for(let c of this.cart) {
      if(c.id === tour.id) {
        //this.cartRef.update(c.key, { elements: el });
        c.elements -= 1;
        if(c.elements == 0){
            this.cart.splice(c.id, 1);
        }
      }
    }
    
  }

  getCartElements(id: number) {
    this.updateLocalTourList();
    this.updateLocalCartList();
    for(let c of this.cart) {
      if(c.id === id) {
        return c.elements;
      }
    }
    return 0;
  }


  getLeastExpensiveID() {
    this.updateLocalTourList();
    let id = 0;
    let mx = 0;
    for(let t of this.tours) if(this.toursWithFilters.includes(t.id)){
      if(t.money > mx) {
        mx = t.money;
        id = t.id;
      }
    }
    return id;
  }
  getMostExpensiveID() {
    let id = 0;
    let mx = 1000000000;
    for(let t of this.tours) if(this.toursWithFilters.includes(t.id)) {
      if(t.money < mx) {
        mx = t.money;
        id = t.id;
      }
    }
    return id;
  }


}