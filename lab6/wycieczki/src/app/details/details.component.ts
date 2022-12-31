import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartElement } from '../cart/cart.component';
import { DbService } from '../db.service';
import { LocalService } from '../local.service';
import { Tour, TourData } from '../tour/tour.component';
import { first, Subscription } from 'rxjs';

interface review {
  nick: string;
  date: string;
  review: string;
}

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  
  //tour!: TourData;
  placesReserved: number = 0;
  displayMinusButton: boolean = false;
  displayPlusButton: boolean = true;
  displayDeleteButton: boolean = true;
  //tourRating: number = 1;
  //tourData!: Tour;
  cartData!: CartElement;


  constructor(
    private route: ActivatedRoute,
    private db: DbService,
    private cartSerivce: LocalService
  ) { }

  private subscription: Subscription | undefined;
  id: number = -1;
  tour: Tour[] = [];
  selected: number = 0;
  reviews: review[] = []

  ngOnInit(): void {
    window.scroll(0, 0);
    this.subscription = this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.db
        .getToursList()
        .pipe(first())
        .subscribe((tours: any[]) => {
          let tour: any;
          for (let t of tours) {
            if (t.id == this.id) {
              tour = t;
              break;
            }
          }
          this.tour.push({
            id: tour.id,
            name: tour.name,
            destination: tour.destination,
            dateBegin: tour.dateBegin,
            dateEnd: tour.dateEnd,
            imageURL: tour.imageURL,
            places: tour.places,
            money: tour.money,
            description: tour.description,
            display: tour.display,
            rate: tour.rate,
            key: tour.key
          } as Tour);
        })
    })
    this.db.updateLocalCartList();
    this.route.params.subscribe(parameter => {
      //console.log(parameter);
      //this.tourData = JSON.parse(parameter['tour']) as Tour;
      this.cartData = JSON.parse(parameter['cart']) as CartElement;
    })
    //console.log(this.tourData);

    //console.log(this.tourData.id);

    this.placesReserved = this.db.getCartElements(this.id);
    this.setButtons();
    if(this.placesReserved > 0) this.displayMinusButton = true;
    this.cartData = {
      tourKey: this.tour[0].key,
      id: this.tour[0].id,
      name: this.tour[0].name,
      money: this.tour[0].money,
      elements: 1
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  addReview(newReview: review) {
    this.reviews.push(newReview);
  }

  setButtons() {
    if(this.placesReserved > 0) this.displayMinusButton = true;
    if(this.placesReserved == this.tour[0].places) this.displayPlusButton = false;
    if(this.placesReserved == 0 ) this.displayMinusButton = false;
    if(this.placesReserved < this.tour[0].places) this.displayPlusButton = true;

  }

  incrementPlaces() {
    //console.log(this.placesReserved);
    this.db.updateLocalCartList();
    if(this.placesReserved < this.tour[0].places) {
      this.placesReserved += 1;
      //console.log(this.tourData.key);
      this.cartSerivce.addTour(this.tour[0]);
      this.db.addToCart(this.cartData, this.placesReserved);
      this.setButtons();
    }
    //console.log(this.cartData.elements);
  }

  decrementPlaces() {
    if(this.placesReserved > 0) {
      this.placesReserved -= 1;
      //this.removeTourFromBasket.emit(this.tourData);
      this.db.deleteFromCart(this.cartData, this.placesReserved);
      //this.cartSerivce.removeTour(this.tourData);
      this.setButtons();
      }
  }

  setRate(e:number) {
    this.tour[0].rate = e;
    this.db
      .updateRate(this.tour[0].key, { rate: e })
  }




}
