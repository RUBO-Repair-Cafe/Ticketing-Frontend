import { Component, HostListener } from '@angular/core';
import { LoadingService } from './loading.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'repair-cafe-ticketing-system';

  constructor(
    public _loadingService: LoadingService,
    public _authService: AuthService,
  ) {}

  /**
   * Logs out the user when closing the page (Prevent token remaining in local storage)
   * Posibility to prevent close of page (not saved stuff?!?)
   * @param event beforeunload event
   */
  @HostListener('window:beforeunload', [' $event '])
  beforeUnloadHandler(event){
    this._authService.logOut();
  }
}
