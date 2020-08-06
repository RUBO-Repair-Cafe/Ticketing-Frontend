import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  private _loading = new BehaviorSubject(false);
  constructor() { }

  get loading() {
    return this._loading.value;
  }

  set loading(loading: boolean) {
    this._loading.next(loading);
  }

  get subject(): BehaviorSubject<boolean> {
    return this._loading;
  }
}
