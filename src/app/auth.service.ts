import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: UserData;

  constructor() {}

  /**
   * Logs out the user by removing the auth data from local storage
   */
  logOut() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('exp');
  }
}

interface UserData {
  firstName: string;
  lastName: string;
  userId: number;
  username: string;
}
