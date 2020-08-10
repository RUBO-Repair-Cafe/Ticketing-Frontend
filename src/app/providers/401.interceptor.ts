import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpStatusCode } from '../statuscode.enum';
import { AuthService } from './auth.service';
import { throwError } from 'rxjs';

@Injectable()
export class HttpUnauthorizedInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('error', error);
        if(error.status === HttpStatusCode.Unauthorized){
          console.log('Unauthoriezd')
          this._authService.openLoginForm();
        }
        return throwError(error);
      })
    );
  }
}