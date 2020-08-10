import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './providers/auth.interceptor';
import { MainModule } from './main/main.module';
import { LoadingService } from './providers/loading.service';
import { AuthService } from './providers/auth.service';
import { LoginFormModule } from './login-form/login-form.module';
import { HttpUnauthorizedInterceptor } from './providers/401.interceptor';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MainModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    LoginFormModule,
    BrowserAnimationsModule,
  ],
  providers: [
    LoadingService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpUnauthorizedInterceptor, multi: true },
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
