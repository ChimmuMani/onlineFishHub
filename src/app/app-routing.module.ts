import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FishListComponent } from './components/fish-list/fish-list.component';
import { CheckoutComponent} from './components/checkout/checkout.component';
import { CartDetailsComponent} from './components/cart-details/cart-details.component';
import { FishDetailsComponent} from './components/fish-details/fish-details.component';

import { from } from 'rxjs';

const routes: Routes = [   
  {path: '', redirectTo: '/fish', pathMatch: 'full'},
  {path: 'fish', component: FishListComponent}, 
  {path: 'checkout', component: CheckoutComponent},
  {path: 'cart-details', component: CartDetailsComponent},
  {path: 'fish/:id', component: FishDetailsComponent},
  {path: 'search/:keyword', component: FishListComponent},
  {path: 'category/:id', component: FishListComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
  
 }
