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

const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'adding', component: AddingComponent },
  { path: 'cart', component: CartComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'userpanel', component: UserpanelComponent },
  { path: 'adminpanel', component: AdminpanelComponent},
  { path: 'managerpanel', component: ManagerpanelComponent},
  { path: '', component: HomepageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
