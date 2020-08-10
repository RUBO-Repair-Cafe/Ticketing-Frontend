import { Component, HostListener, ChangeDetectorRef, OnInit } from '@angular/core';
import { LoadingService } from './providers/loading.service';
import { AuthService } from './providers/auth.service';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'repair-cafe-ticketing-system';
  loading: boolean;
  needsLogin: boolean;

  constructor(
    public _loadingService: LoadingService,
    public _authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef,
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

  ngOnInit(){
    this.detectNeedsLogin();
    this.detectLoadingChange();
  }

  detectLoadingChange(): void{
    this._loadingService.subject.subscribe((loading: boolean) => {
      this.loading = loading;
      this._changeDetectorRef.detectChanges();
    })
  }

  detectNeedsLogin(): void {
    this._authService.needsLogin.subscribe((needsLogin: boolean) => {
      console.log('Needs login', needsLogin);
      this.needsLogin = needsLogin;
      this._changeDetectorRef.detectChanges();
    })
  }

  onLoginSuccess(): void {
    this._authService.closeLoginForm();
  }
}
