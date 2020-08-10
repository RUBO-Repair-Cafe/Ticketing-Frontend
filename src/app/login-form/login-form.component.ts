import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from './login.service';
import { LoadingService } from '../providers/loading.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpStatusCode } from '../statuscode.enum';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  @Output() loginEvent = new EventEmitter<boolean>();

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
    } finally {
      this._loadingService.loading = false;
      this.loginEvent.emit(true);
    }
  }
}

interface ILoginForm{
  username: string;
  password: string;
}
