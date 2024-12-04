import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private openBehaviorSubject = new BehaviorSubject(false);
  open = this.openBehaviorSubject.asObservable();

  constructor() { 

  }

  openMenu() {
    this.openBehaviorSubject.next(true);
  }

  closeMenu() {
    this.openBehaviorSubject.next(false);
  }
}
