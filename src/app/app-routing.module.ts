import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { IndexComponent } from './pages/index/index.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './pages/profile/profile.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryListComponent } from './pages/category-list/category-list.component';
import { PlaceOrderComponent } from './pages/place-order/place-order.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: DefaultComponent,
    children: [
      {
        path: '',
        redirectTo: 'index',
        pathMatch: 'full',
      },
      {
        path: 'index',
        component: IndexComponent,
        loadChildren: () =>
          import('./pages/index/index.module').then((m) => m.IndexModule),
      },
      {
        path: 'items',
        component: CategoryListComponent,
        loadChildren: () =>
          import('./pages/category-list/category-list.module').then(
            (m) => m.CategoryListModule
          ),
      },
      {
        path: 'item/:id',
        component: ItemPageComponent,
        loadChildren: () =>
          import('./pages/item-page/item-page.module').then(
            (m) => m.ItemPageModule
          ),
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./pages/auth/auth.module').then((m) => m.AuthModule),
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        component: ProfileComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/profile/profile.module').then(
                (m) => m.ProfileModule
              ),
          },
        ],
      },
      {
        path: 'cart',
        canActivate: [AuthGuard],
        component: CartComponent,
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./pages/cart/cart.module').then((m) => m.CartModule),
          },
        ],
      },
      {
        path: 'place-order',
        canActivate: [AuthGuard],
        component: PlaceOrderComponent,
      },
      {
        path:'**',
        component: ErrorComponent,
        data: {
          code: 404,
          message: 'Are you sure you wanted to go here?'
        }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
