import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { cars } from './cars';

interface Car {
  mark: string,
  model: string,
  colors: string []
}

@Component({
  selector: 'app-car-picker',
  templateUrl: './car-picker.component.html',
  styleUrls: ['./car-picker.component.css']
})
export class CarPickerComponent implements OnInit {
  cars: Car[];
  selectedMark: string = "";
  selectedModel: string = "";
  selectedColor: string = "";
  marks: string[] = [];
  models: string[] = [];
  colors: string[] = [];
  showCar = false;
  showModels = false;
  showColors = false;
  showMarks = false;

  constructor() { 
    this.cars = cars;
    this.showMarks = true;
    this.generateMarks();
  }

  ngOnInit(): void {
  }

  generateMarks() {
    for (let car of cars) {
      if (this.marks.includes(car.mark) == false) {
        this.marks.push(car.mark);
      }
    }
  }
  
  generateModels() {
    this.showModels = true;
    this.models = [];
    this.selectedModel = "";
    for (let car of cars) {
      if (car.mark == this.selectedMark) {
        this.models.push(car.model);
      }
    }
  }

  generateColors() {
    this.showColors = true;
    for (let car of cars) {
      if (car.mark == this.selectedMark && car.model == this.selectedModel) {
        this.colors = car.colors;
      }
    }
  }

  chosenColor(color:string) {
    this.selectedColor = color;
    this.showCar = true;
  }
}