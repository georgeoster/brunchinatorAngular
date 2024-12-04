import { Component } from '@angular/core';
import { MenuService } from '../../../services/menu.service';
import { NgClass } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'brunch-hamburger',
  imports: [NgClass],
  templateUrl: './hamburger.component.html',
  styleUrl: './hamburger.component.css'
})
export class HamburgerComponent {
  menuOpen:boolean = false;
  menuServiceSubscription:Subscription = new Subscription;

  constructor(private menuService:MenuService) {
    this.subscribeToMenuService();
  }

  ngOnDestroy() {
    this.menuServiceSubscription.unsubscribe();
  }

  subscribeToMenuService() {
    this.menuServiceSubscription = this.menuService.open.subscribe((b:boolean) => {
      this.menuOpen = b;
    });
  }

  toggleMenu() {
    this.menuOpen ? this.menuService.closeMenu() : this.menuService.openMenu();
  }
}
