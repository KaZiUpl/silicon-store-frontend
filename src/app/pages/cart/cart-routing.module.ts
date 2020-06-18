import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayCartComponent } from './components/display-cart/display-cart.component';


const routes: Routes = [
  {
    path: '',
    component: DisplayCartComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CartRoutingModule { }
