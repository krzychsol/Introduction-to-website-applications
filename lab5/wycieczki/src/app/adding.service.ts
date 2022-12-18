import { Injectable } from '@angular/core';
import { Tour } from './tour/tour.component';
//import { AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import { Component } from '@angular/core';
//import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { CrudService } from './service/crud.service';

@Injectable({
  providedIn: 'root'
})
export class AddingService {

  //private dbPath = 'tours';
  toursRef: Tour[] = [];


  constructor(private crudService: CrudService) {
      this.crudService.getTours().subscribe(res => {
        this.toursRef = res as Tour[]
    })
  }

  createTour(tour: Tour): void {
      this.toursRef.push({ ...tour })
      this.crudService.addTour(tour).subscribe(() => {
          console.log("Tour added successfully!");
      })
  }

}