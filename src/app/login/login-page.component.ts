import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './login.service';
import { LoadingService } from '../loading.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpStatusCode } from '../statuscode.enum';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private readonly _fb: FormBuilder,
    private readonly _snackBarService: MatSnackBar,
    private readonly _loginService: LoginService,
    private _loadingService: LoadingService,
  ) { }

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
    this.loginForm.markAsTouched();
  }

  /**
   * Handles login button press
   */
  async onLogin(){
    const values: ILoginForm = this.loginForm.value;
    this._loadingService.loading = true;
    try {
      await this._loginService.login(values.username, values.password);
    } catch (error) {
      if (error instanceof HttpErrorResponse){
        if (error.status === HttpStatusCode.Unauthorized){
          this._snackBarService.open('Falsche Benutzerdaten', 'Schließen', { duration: 5000 });
        }
      }
    }
    this._loadingService.loading = false;
  }
}

interface ILoginForm{
  username: string;
  password: string;
}
