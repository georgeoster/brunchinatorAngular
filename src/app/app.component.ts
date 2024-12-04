import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header//header/header.component';
import { NavigationMenuComponent } from "./components/header/navigation-menu/navigation-menu.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, NavigationMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'brunchinatorAngular';
}
