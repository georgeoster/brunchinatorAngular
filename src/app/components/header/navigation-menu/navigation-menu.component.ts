import { Component } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuService } from '../../../services/menu.service';
import { NavigationMenuItem } from '../../../models/NavigationMenuItem';
import { User } from '../../../models/User';
import { ROUTE_NAMES } from '../../../models/RouteNames';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'brunch-navigation-menu',
  imports: [NgClass],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.css'
})
export class NavigationMenuComponent {
  
  showMenu:boolean = false;
  menuItems:Array<NavigationMenuItem> = [
    {icon: 'home', label: 'Home', route: ROUTE_NAMES.HOME},
    {icon: 'review', label: 'View Reviews', route: ROUTE_NAMES.VIEW_REVIEWS },
    {icon: 'register', label: 'Register', route: ROUTE_NAMES.SIGN_UP },
    {icon: 'user', label: 'Sign In', route: ROUTE_NAMES.SIGN_IN },
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

  iconFor(item:NavigationMenuItem) {
    return `/${item.icon}.png`;
  }

  subscribeToUserService(){
    this.userServiceSubscription = this.userService.user.subscribe((user: User) => {
      if(user?.token?.length > 0) {
        this.menuItems = [
          {icon: 'home', label: 'Home', route: ROUTE_NAMES.HOME},
          {icon: 'addReview', label: 'Add Review', route: ROUTE_NAMES.ADD_REVIEW},
          {icon: 'review', label: 'View Reviews', route: ROUTE_NAMES.VIEW_REVIEWS },
          {icon: 'user', label: 'Profile', route: `${ROUTE_NAMES.PROFILE}/${user.userName}` },
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
