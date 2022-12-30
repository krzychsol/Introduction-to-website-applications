import { Component,OnInit } from '@angular/core';
import { find, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DbService } from '../db.service';
import { Roles, User} from '../user';

@Component({
  selector: 'app-adminpanel',
  templateUrl: './adminpanel.component.html',
  styleUrls: ['./adminpanel.component.css']
})
export class AdminpanelComponent implements OnInit {

  constructor(public auth: AuthService,private db: DbService){}

  selectedPersistence = this.auth.persistenceSetting;
  selectedRoleToAdd: any;
  selectedRoleToDismiss: any;

  users: User[] = [];
  usersSub: Subscription | undefined;

  ngOnInit(): void {
    console.log(this.auth?.userData)
    this.usersSub = this.db.getUsers().subscribe((users) => {
      this.users = [];
      for (let user of users) {
        let userToAdd = new User(user.payload.val());
        console.log(user.payload.val());
        userToAdd.uid = user.payload.key || 'undefined';
        this.users.push(userToAdd);
      }
    });
  }

  ngOnDestroy():void{
    this.usersSub?.unsubscribe();
  }

  chosenPersistence() {
    console.log(this.selectedPersistence);
    this.auth.setPersistance(this.selectedPersistence);
  }

  banUser(uid: string) {
    this.db.changeUserRole(uid, 'banned', 'true');
  }
  setRole(uid: string, role: string, value: boolean) {
    this.db.changeUserRole(uid, role, String(value));
  }

  getUserRoles(uid: string): Roles | null {
    let searchedUser = this.findUserByUid(uid);
    if (searchedUser != null) return searchedUser.roles;
    return null;
  }

  findUserByUid(uid: string): User | null {
    for (let user of this.users) {
      if (user.uid == uid) return user;
    }
    return null;
  }

}
