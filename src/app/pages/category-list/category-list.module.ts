import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryListRoutingModule } from './category-list-routing.module';
import { CategoryListComponent } from './category-list.component';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  declarations: [CategoryListComponent],
  imports: [CommonModule, ComponentsModule, CategoryListRoutingModule],
})
export class CategoryListModule {}
