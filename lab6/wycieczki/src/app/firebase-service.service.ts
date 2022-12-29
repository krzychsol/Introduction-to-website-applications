import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList
} from '@angular/fire/compat/database';
import { first, firstValueFrom, map, Observable } from 'rxjs';
import { Tour } from './tour/tour.component';
import { Roles, User } from './user';

@Injectable({
  providedIn: 'root'
})

export class FirebaseServiceService {
  tours: Observable<any[]>;
  private nextId: number | undefined
  
  constructor(private db: AngularFireDatabase) {
    this.tours = this.db.list('Tours').valueChanges();
    this.db
      .list('Tours',(ref) => ref.orderByChild('id').limitToLast(1))
      .valueChanges()
      .subscribe((res: any[]) => {
        this.nextId = res[0]?.id + 1;
      });
   }

   getTours(): Observable<any[]>{
    return this.tours;
   }

   addTour(tour: Tour){
    this.db.list('Tours').push({
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
    });
   } 

   removeTour(idx: Number){
    this.db
      .list('Tours')
      .snapshotChanges()
      .pipe(first())
      .subscribe((items: any) => {
        for(let i of items){
          if(i.payload.val().id == idx){
            console.log(i.payload.key);
            this.db.list('Tours').remove(i.payload.key);
          }
        }
      });
   }

   changePriceOfTour(idx: number, price: number) {
    this.db
      .list('Tours')
      .snapshotChanges()
      .pipe(first())
      .subscribe((items: any) => {
        for (let i of items) {
          if (i.payload.val().id == idx) {
            console.log(i.payload.key);
            this.db.list('Tours').update(i.payload.key, { money: price });
          }
        }
      });
  }

  changeNameOfTour(idx: number, name: string) {
    this.db
      .list('Tours')
      .snapshotChanges()
      .pipe(first())
      .subscribe((items: any) => {
        for (let i of items) {
          if (i.payload.val().id == idx) {
            console.log(i.payload.key);
            this.db.list('Tours').update(i.payload.key, { name: name });
          }
        }
      });
  }

  changeDescOfDish(idx: number, desc: string) {
    this.db
      .list('Tours')
      .snapshotChanges()
      .pipe(first())
      .subscribe((items: any) => {
        for (let i of items) {
          if (i.payload.val().id == idx) {
            console.log(i.payload.key);
            this.db.list('Tours').update(i.payload.key, { description: desc });
          }
        }
      });
  }

  //TODO: More updates of tour fields

  getNextid() {
    return this.nextId;
  }

  addNewUser(user: User) {
    this.db.object('/users/' + user.uid).set({
      email: user.email,
      roles: user.roles,
    });
  }

  async getUserRoles(uid: string) {
    return firstValueFrom(
      this.db.object('/users/' + uid + '/roles').valueChanges()
    );
  }

  getUserRoles$(uid: string) {
    return this.db.object('/users/' + uid + '/roles').valueChanges();
  }

  getUsers() {
    return this.db.list('users').snapshotChanges();
  }

  changeUserRole(uid: string, role: string, value: string) {
    let change = '{"' + role + '"' + ':' + value + '}';
    this.db.object('/users/' + uid + '/roles').update(JSON.parse(change));
  }

  getOrderHistory$(uid:string){
    return this.db.object('/orderhistory/' + uid).valueChanges();
  }

  pushOrder(items: string[], uid:string){
    try{
      this.db.list('/orderhistory/' + uid).push({items: items, date: new Date().toLocaleDateString()})
    }
    catch (err){
      window.alert(err)
    }
  }

  updateTour(data: any, idS:string){
    this.db.list('Tours').snapshotChanges().pipe(first()).subscribe((items: any) => {
      for (let i of items) {
        if (i.payload.val().id == idS) {
          this.db.list('Tours').update(i.payload.key, data)
        }
      }
    });
  }
}
