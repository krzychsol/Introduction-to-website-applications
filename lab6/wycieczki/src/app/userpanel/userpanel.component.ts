import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { first} from 'rxjs';
import { DbService } from '../db.service';
import { tours } from '../tours';

@Component({
  selector: 'app-userpanel',
  templateUrl: './userpanel.component.html',
  styleUrls: ['./userpanel.component.css']
})
export class UserpanelComponent implements OnInit {

  modelForm = new FormControl();
  persValue = "LOCAL"

  constructor(
    public auth: AuthService,
    public db: DbService
    ) {}

  orderHistoryIds: string[] = []
  orderHistory: any | undefined
  toursArr: any[] = []

  ngOnInit(): void {
    this.auth.getuser().then(res => {
      console.log(res);
    })
    this.db.getOrderHistory$(this.auth.userData.uid).pipe(first()).subscribe((data:any) =>{
      if(data){
        this.orderHistoryIds = Object.keys(data)
        this.orderHistory = data
      }
    })
    /*
    this.db.getToursList().pipe(first()).subscribe((tours: any[] =>{
      this.toursArr = []
      for(let t in tours){
        this.toursArr.push(tours[t])
      }
    }))*/
  }

  setPersistence(s: string){
    //console.log(this.persValue);
    this.auth.setPersistance(s.toLowerCase());
    console.log("Setting persistence to: " + s);
  }


}
