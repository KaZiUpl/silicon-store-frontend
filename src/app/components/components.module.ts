import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { MainCategoryMenuComponent } from './main-category-menu/main-category-menu.component';
import { ItemListComponent } from './item-list/item-list.component';
import { SafePipe } from '../pipes/safe.pipe';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { RouterModule } from '@angular/router';
import { OrderNumberPipe } from '../pipes/order-number.pipe';
import { MaterialModule } from './material.module';
import { PaginationComponent } from './pagination/pagination.component';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    MainCategoryMenuComponent,
    ItemListComponent,
    SafePipe,
    BreadcrumbsComponent,
    OrderNumberPipe,
    PaginationComponent,
  ],
  imports: [CommonModule, RouterModule, MaterialModule],
  exports: [
    MenuComponent,
    FooterComponent,
    MainCategoryMenuComponent,
    ItemListComponent,
    BreadcrumbsComponent,
    SafePipe,
    OrderNumberPipe,
    PaginationComponent,
  ],
})
export class ComponentsModule {}
