import { Component } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuService } from '../../../services/menu.service';
import { NavigationMenuItem, User } from '../../../utils/types/all.types';
import { ROUTE_NAMES } from '../../../utils/types/globalsConsts';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'brunch-navigation-menu',
  imports: [NgClass, NgFor],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.css'
})
export class NavigationMenuComponent {
  
  showMenu:boolean = false;
  menuItems:Array<NavigationMenuItem> = [
    {icon: 'home', label: 'Home', route: ROUTE_NAMES.HOME},
    {icon: 'home', label: 'View Reviews', route: ROUTE_NAMES.VIEW_REVIEWS },
    {icon: 'home', label: 'Register', route: ROUTE_NAMES.SIGN_UP },
    {icon: 'home', label: 'Sign In', route: ROUTE_NAMES.SIGN_IN },
  ];
  menuServiceSubscription:Subscription = new Subscription;
  userServiceSubscription:Subscription = new Subscription;

  constructor(private menuService:MenuService, private userService:UserService, private router: Router){
    this.subscribeToMenuService();
    this.subscribeToUserService();
  }

  ngOnDestroy() {
    this.menuServiceSubscription.unsubscribe();
    this.userServiceSubscription.unsubscribe();
  }

  subscribeToUserService(){
    this.userServiceSubscription = this.userService.user.subscribe((user: User) => {
      if(user?.token?.length > 0) {
        this.menuItems = [
          {icon: 'home', label: 'Home', route: ROUTE_NAMES.HOME},
          {icon: 'home', label: 'Add Review', route: ROUTE_NAMES.ADD_REVIEW},
          {icon: 'home', label: 'View Reviews', route: ROUTE_NAMES.VIEW_REVIEWS },
          {icon: 'home', label: 'Profile', route: `${ROUTE_NAMES.PROFILE}/${user.userName}` },
        ];
      }
    });
  }

  subscribeToMenuService(){
    this.menuServiceSubscription = this.menuService.open.subscribe((b:boolean) => {
      this.showMenu = b;
    });
  }

  closeMenu(){
    this.menuService.closeMenu();
  }

  routerHandler(param:string) {
    this.router.navigate([param]);
    this.closeMenu();
  }

}
