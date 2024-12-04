import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from '../types/all.types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isLoggedInSubject = new BehaviorSubject(false);
  isLoggedIn = this.isLoggedInSubject.asObservable();

  private userSubject = new Subject<User>();
  user = this.userSubject.asObservable();


  constructor() { }
}
