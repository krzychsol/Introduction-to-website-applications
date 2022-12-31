import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { first, mapTo, Observable, Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DbService } from '../db.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private db: DbService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.getAuthenticated().pipe(
      map((state) => {
        if (state == null) {
          // console.log('AUTH OUT');
          this.router.navigate(['']);
          return false;
        }
        this.auth.userData = state;
        return true;
      })
    );
  }
}
