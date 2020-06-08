import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DefaultModule } from './layouts/default/default.module';
import { UserService } from './services/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { IndexModule } from './pages/index/index.module';
import { HttpClientModule } from '@angular/common/http';
import { ItemsService } from './services/items.service';
import { CategoriesService } from './services/categories.service';
import { AuthModule } from './pages/auth/auth.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    DefaultModule,
    IndexModule,
    AuthModule
  ],
  providers: [
    UserService,
    ItemsService,
    CategoriesService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
