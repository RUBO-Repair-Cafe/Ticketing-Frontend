import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: UserData;
  needsLogin = new BehaviorSubject(false);

  constructor() {}

  /**
   * Logs out the user by removing the auth data from local storage
   */
  logOut() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('exp');
  }

  openLoginForm(): void{
    this.needsLogin.next(true);
  }

  closeLoginForm(): void{
    this.needsLogin.next(false);
  }
}

interface UserData {
  firstName: string;
  lastName: string;
  userId: number;
  username: string;
}
