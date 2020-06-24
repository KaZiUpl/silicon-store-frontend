import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceOrderRoutingModule } from './place-order-routing.module';
import { PlaceOrderComponent } from './place-order.component';
import { MaterialModule } from 'src/app/components/material.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PlaceOrderComponent],
  imports: [
    CommonModule,
    PlaceOrderRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class PlaceOrderModule {}
