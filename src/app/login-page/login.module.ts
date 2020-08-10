import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginPageComponent } from './login-page.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginFormModule } from '../login-form/login-form.module';

const routes: Routes = [
  { path:  '', component: LoginPageComponent },
]

@NgModule({
  declarations: [LoginPageComponent],
  imports: [
    CommonModule,
    LoginFormModule,
    RouterModule.forChild(routes),
  ],
  providers: []
})
export class LoginModule { }
