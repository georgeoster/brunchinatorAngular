import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { NavigationMenuComponent } from '../header/navigation-menu/navigation-menu.component';

@Component({
  selector: 'brunch-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet, NavigationMenuComponent],
  templateUrl: './layout.component.html'
})
export class LayoutComponent {}
