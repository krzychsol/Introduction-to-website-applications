import { Injectable,NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, first,firstValueFrom } from 'rxjs';
import { DbService } from './db.service';
import { Router } from '@angular/router';
import { LocalService } from './local.service';
import { Roles,User} from './user';

export interface Credentials {
  email: string;
  password: string;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any = null;
  userRoles: Roles = {
    guest: true,
    admin: false,
    manager: false,
    client: false,
    banned: false,
  };
  persistenceSetting: string = 'local';
  
  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private db: DbService,
    private basket: LocalService
    ) {
      fireAuth.authState.subscribe(async (ev: any) => {
        if (ev) {
          this.userData = ev;
          const roles = await this.db.getUserRoles(ev?.uid);
          this.userRoles = roles as Roles;
        } else {
          this.userData = null;
          this.userRoles = {
            guest: true,
            admin: false,
            manager: false,
            client: false,
            banned: false,
          };
        }
      });
  }

  signInEmailPass(email: string, password: string) {
    return this.fireAuth.setPersistence(this.persistenceSetting).then((_) => {
      return this.fireAuth
        .signInWithEmailAndPassword(email, password)
        .then((ev) => {
          this.router.navigate(['dashboard']);
        })
        .catch((err) => {
          window.alert(err.message);
        });
    });
  }

  registerEmailPass(email: string, password: string) {
    return this.fireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        let userData = new User(res.user);
        this.db.addNewUser(userData);
        this.router.navigate(['dashboard']);
      })
      .catch((err) => {
        window.alert(err.message);
      });
  }

  getuser() {
    return this.fireAuth.currentUser;
  }

  login(email : string, password: string) {
    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  register(email:string, password: string) {
    return this.fireAuth.createUserWithEmailAndPassword(email, password);
  }

  logout() {
    return this.fireAuth.signOut();
  }

  setPersistance(s: string): void{
    this.fireAuth.setPersistence(s);
  }

  getLogged() {
    return this.userData; 
  }

  getUser(){
    return this.fireAuth.currentUser;
  }

  isLoggedIn() {
    return this.userData != null;
  }

  getAuthenticated(): Observable<any> {
    return this.fireAuth.authState;
  }

}