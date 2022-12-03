import { Component, OnInit, ElementRef } from '@angular/core';
import { NgModel } from '@angular/forms';


@Component({
  selector: 'app-car-picker',
  templateUrl: './car-picker.component.html',
  styleUrls: ['./car-picker.component.css']
})
export class CarPickerComponent implements OnInit {
  
  selectedMark!: string;
  selectedModel!: string;
  selectedColor!: string;
  carData: any
  colorChoose!: string[];

  showCar = false;
  showModels = false;
  showColors = false;
  showMarks = false;

  constructor() { 
  }

  ngOnInit(): void {
    fetch('../../assets/cars.json').then(res => res.json())
      .then(json => {
        this.carData = json
        this.showMarks = true
      });
  }

  chosenMark() {
    this.showModels = true
    this.showCar = false
    this.showColors = false
  }

  chosenModel() {
    this.showColors = true
    this.colorChoose = this.carData[this.selectedMark][this.selectedModel]
    this.showCar = false
  }

  chosenColor(color: string) {
    this.selectedColor = color;
    this.showCar = true 
  }
}