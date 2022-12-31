import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddingComponent } from './adding/adding.component';
import { CartComponent } from './cart/cart.component';
import { DetailsComponent } from './details/details.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShopComponent } from './shop/shop.component';
import { UserpanelComponent } from './userpanel/userpanel.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AdminpanelComponent } from './adminpanel/adminpanel.component';
import { ManagerpanelComponent } from './managerpanel/managerpanel.component';
import { ModifyTourComponent } from './modify-tour/modify-tour.component';
import { TourDetailsGuard } from './guard/tour-details.guard';
import { AuthGuard } from './guard/auth.guard';
import { LoginTwiceGuard } from './guard/login-twice.guard';
import { MenagerGuard } from './guard/menager.guard';
import { AdminGuard } from './guard/admin.guard';

const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'adding', component: AddingComponent },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'shop/details/:id',
    component: DetailsComponent,
    canActivate: [TourDetailsGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [LoginTwiceGuard]
  },
  { path: 'register', component: RegisterComponent },
  {
    path: 'userpanel',
    component: UserpanelComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'adminpanel',
    component: AdminpanelComponent,
    canActivate: [AdminGuard],
  },
  {
    path: 'managerpanel',
    component: ManagerpanelComponent,
    canActivate: [MenagerGuard],
  },
  {
    path: 'managerpanel/modify/:id',
    component: ModifyTourComponent,
    canActivate: [AuthGuard, MenagerGuard],
  },
  { path: '', component: HomepageComponent },
  //{ path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
