import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ignoreElements } from 'rxjs';

@Component({
  selector: 'app-car-picker',
  templateUrl: './car-picker.component.html',
  styleUrls: ['./car-picker.component.css']
})
export class CarPickerComponent implements OnInit {
  products: any = [];
  url = "assets/cars.json";
  rawCars :any;
  manufacturers :Set<string> = new Set();
  models: Map<string, Array<string>> = new Map();
  colors: Map<string, Set<string>> = new Map();
  manufacturer = '';
  model = '';
  color = '';


  constructor(private http :HttpClient) { 
  }

  ngOnInit(): void {
    this.http.get(this.url).subscribe(result => {
      this.rawCars = result;
      console.log(result);
      this.categorizeCars();
    });
  }

  categorizeCars () {
    for (let car of this.rawCars) {
      this.manufacturers.add(car.manufacturer);

      if (!this.models.has(car.manufacturer)) {
        this.models.set(car.manufacturer, []);
      }
      this.models.get(car.manufacturer)?.push(car.model);

      if (!this.colors.has(car.model)) {this.colors.set(car.model, new Set())}
      for (let color of car.colors) {
        this.colors.get(car.model)?.add(color);
      }
    }
  }

  onManufacturerChange(event: Event) {
    this.manufacturer = (<HTMLInputElement>event.target).value;
  }

  onModelChange(event: Event) {
    this.model = (<HTMLInputElement>event.target).value;
  }

  onColorChange(color: string) {
    this.color = color;
  }

}