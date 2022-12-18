import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddingComponent } from './adding/adding.component';
import { CartComponent } from './cart/cart.component';
import { DetailsComponent } from './details/details.component';
import { HomepageComponent } from './homepage/homepage.component';
import { ShopComponent } from './shop/shop.component';

const routes: Routes = [
  { path: 'shop', component: ShopComponent },
  { path: 'adding', component: AddingComponent },
  { path: 'cart', component: CartComponent },
  { path: 'details', component: DetailsComponent },
  {path: '',component: HomepageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
