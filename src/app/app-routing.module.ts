import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { IndexComponent } from './pages/index/index.component';
import { ItemPageComponent } from './pages/item-page/item-page.component';

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
        path: 'item/:id',
        component: ItemPageComponent,
        loadChildren: () =>
          import('./pages/item-page/item-page.module').then(
            (m) => m.ItemPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
