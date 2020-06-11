import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ItemPageRoutingModule } from './item-page-routing.module';
import { ItemPageComponent } from './item-page.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { CommentSectionComponent } from './components/comment-section/comment-section.component';


@NgModule({
  declarations: [ItemPageComponent, CommentSectionComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    ItemPageRoutingModule
  ]
})
export class ItemPageModule { }
