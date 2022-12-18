import { AfterViewInit, Component } from '@angular/core';
import { map } from 'rxjs/operators';
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

  constructor() {   
  }

  ngAfterViewInit(): void {
    //this.setMinMax()
  }
}
