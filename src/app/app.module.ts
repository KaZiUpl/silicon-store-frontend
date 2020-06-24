import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { IndexModule } from './pages/index/index.module';
import { HttpClientModule } from '@angular/common/http';
import { ItemService } from './services/item.service';
import { AuthModule } from './pages/auth/auth.module';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { CategoryService } from './services/category.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: true,
      maxOpened: 5,
      positionClass: 'toast-bottom-right',
    }),
    HttpClientModule,
    DefaultModule,
    IndexModule,
    AuthModule,
  ],
  providers: [
    Title,
    UserService,
    ItemService,
    CategoryService,
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
