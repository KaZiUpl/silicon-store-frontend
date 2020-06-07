import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { IndexComponent } from './pages/index/index.component';

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
    ],
  },
  { path: './', loadChildren: () => import('./pages/index/index.module').then(m => m.IndexModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
