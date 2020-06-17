import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DisplayProfileComponent } from './components/display-profile/display-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { componentFactoryName } from '@angular/compiler';
import { OrderComponent } from './components/order/order.component';

const routes: Routes = [
  {
    path: '',
    component: DisplayProfileComponent,
    pathMatch: 'full',
  },
  {
    path: 'edit',
    component: EditProfileComponent,
  },
  {
    path: 'orders/:id',
    component: OrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
