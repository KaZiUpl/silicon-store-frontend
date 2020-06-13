import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { DisplayProfileComponent } from './components/display-profile/display-profile.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [ProfileComponent, DisplayProfileComponent, EditProfileComponent],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    ComponentsModule
  ]
})
export class ProfileModule { }
