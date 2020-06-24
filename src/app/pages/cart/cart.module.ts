import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { DisplayCartComponent } from './components/display-cart/display-cart.component';
import { MaterialModule } from 'src/app/components/material.module';

@NgModule({
  declarations: [CartComponent, DisplayCartComponent],
  imports: [CommonModule, CartRoutingModule, MaterialModule],
})
export class CartModule {}
