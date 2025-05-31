import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-DGZK35L77T', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  title = 'brunchinatorAngular';
}
