import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { ButtonComponent } from "../../formComponents/button/button.component";
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../../types/all.types';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../types/globalsConsts';

@Component({
  selector: 'brunch-user',
  imports: [NgIf, ButtonComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  ROUTE_NAMES = ROUTE_NAMES;
  isLoggedInSubscription: Subscription = new Subscription;
  isLoggedIn: boolean = false;

  userSubscription: Subscription = new Subscription;
  user: User = {userName: '', email: '', token: ''};

  constructor(private userService: UserService, private router: Router) {
    this.subscribeToIsLoggedIn();
    this.subscribeToUser();
  }

  ngOnDestroy() {
    this.isLoggedInSubscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }

  subscribeToIsLoggedIn(){
    this.isLoggedInSubscription = this.userService.isLoggedIn.subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  subscribeToUser(){
    this.userSubscription = this.userService.user.subscribe((user: User) => {
      this.user = user;
    });
  }

  routeTo(route:string){
    this.router.navigate([route])
  }
}
