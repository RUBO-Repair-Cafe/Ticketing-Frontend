import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, AfterViewInit {

  @ViewChild('sidenav') sideNav: MatSidenav;
  private _sideNavOpen = false;


  constructor(private _changeDet: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.toggleSidenav();
    this._changeDet.detectChanges();
  }

  toggleSidenav(): void {
    this._sideNavOpen = !this._sideNavOpen;
    this.sideNav.toggle();
  }

}
