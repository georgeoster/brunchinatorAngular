import { Component } from '@angular/core';
import { ButtonComponent } from "../../uiComponents/button/button.component";
import { UserService } from '../../../services/user.service';
import { Subscription } from 'rxjs';
import { User } from '../../../utils/types/all.types';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../utils/types/globalsConsts';
import { MenuService } from '../../../services/menu.service';

@Component({
  selector: 'brunch-user',
  imports: [ButtonComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  ROUTE_NAMES = ROUTE_NAMES;
  isLoggedIn: boolean = false;

  userSubscription: Subscription = new Subscription;
  user: User = {userName: '', email: '', token: ''};

  constructor(private userService:UserService, private menuService:MenuService, private router:Router) {
    this.subscribeToUser();
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  subscribeToUser(){
    this.userSubscription = this.userService.user.subscribe((user: User) => {
      if(user?.token?.length > 0) {
        this.user = user;
        this.isLoggedIn = true;
      }
    });
  }

  routeTo(route:string){
    this.menuService.closeMenu();
    this.router.navigate([route])
  }

  navigateToProfile(route:string){
    this.menuService.closeMenu();
    this.router.navigateByUrl(`/${route}/${this.user.userName}`);
  }
}
