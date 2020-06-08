import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { MainCategoryMenuComponent } from './main-category-menu/main-category-menu.component';
import { ItemListComponent } from './item-list/item-list.component';
import { SafePipe } from '../pipes/safe.pipe';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    MainCategoryMenuComponent,
    ItemListComponent,
    SafePipe
  ],
  imports: [CommonModule],
  exports: [
    MenuComponent,
    FooterComponent,
    MainCategoryMenuComponent,
    ItemListComponent,
    SafePipe
  ],
})
export class ComponentsModule {}
