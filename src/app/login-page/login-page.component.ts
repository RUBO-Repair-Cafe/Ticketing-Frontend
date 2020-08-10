import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../login-form/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpStatusCode } from '../statuscode.enum';
import { LoadingService } from '../providers/loading.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  constructor(
    private readonly _snackBarService: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }
}
