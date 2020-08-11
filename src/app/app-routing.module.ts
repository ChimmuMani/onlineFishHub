import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { FishListComponent } from './components/fish-list/fish-list.component';

import { from } from 'rxjs';

const routes: Routes = [   
  {path: 'fish', component: FishListComponent}, 
  {path: '', redirectTo: '/fish', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
 }
