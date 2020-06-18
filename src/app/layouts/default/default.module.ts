import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from 'src/app/components/components.module';
import { AuthModule } from '../../pages/auth/auth.module';
import { ProfileModule } from '../../pages/profile/profile.module';
import { CartModule } from '../../pages/cart/cart.module';



@NgModule({
  declarations: [DefaultComponent],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    AuthModule,
    ProfileModule,
    CartModule
  ]
})
export class DefaultModule { }
