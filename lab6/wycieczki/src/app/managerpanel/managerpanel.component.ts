import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { LocalService } from '../local.service';
import { DbService } from '../db.service';
import { Tour } from '../tour/tour.component';

@Component({
  selector: 'app-managerpanel',
  templateUrl: './managerpanel.component.html',
  styleUrls: ['./managerpanel.component.css']
})
export class ManagerpanelComponent implements OnInit{

  constructor(
    public auth: AuthService,
    public basket: LocalService,
    public db: DbService
  ){}
    
  tours: Tour[] = [];

  ngOnInit(): void {
    this.db.getToursList().valueChanges().subscribe((change) => {
      this.tours = [];
      for(let tour of change){
        this.tours.push({
          key: tour.key,
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
          rate: tour.rate
        })
      }
    })
  }

  deleteTour(idx:number){
    this.db.removeTour(idx);
  }

}
