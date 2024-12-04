import { Component } from '@angular/core';
import { HamburgerComponent } from "../hamburger/hamburger.component";
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'brunch-header',
  imports: [HamburgerComponent, UserComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
