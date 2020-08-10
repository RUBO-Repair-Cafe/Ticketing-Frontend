import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtResponseDto } from '../login-page/dto/jwtReponse.dto';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../providers/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private _http: HttpClient,
    private _authService: AuthService,
    ) { }

  /**
   * Logs in the user and returns the JWT response.
   * Saves the JWT and the exp as ``auth_token`` and ``exp`` in local storage
   * @param username username
   * @param password password
   */
  login(username: string, password: string): Promise<JwtResponseDto>{
    return this._http.post(`${environment.apiUrl}/auth/login`, { username, password })
    .pipe<JwtResponseDto>(map((jwt: JwtResponseDto) => {
      const jwtContent: JWTContent = jwt_decode(jwt.access_token);
      localStorage.setItem('auth_token', jwt.access_token);
      localStorage.setItem('exp', JSON.stringify(jwtContent.exp));
      this._authService.userData = {
        firstName: jwtContent.firstName,
        lastName: jwtContent.lastName,
        username: jwtContent.username,
        userId: jwtContent.sub
      };
      return jwt;
    }))
    .toPromise();
  }
}

interface JWTContent{
  exp: Date;
  firstName: string;
  lastName: string;
  iat: Date;
  sub: number;
  username: string;
}
