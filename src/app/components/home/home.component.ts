import { Component } from '@angular/core';
import { CardComponent } from '../uiComponents/card/card.component';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../models/RouteNames';

@Component({
  selector: 'brunch-home',
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  ROUTE_NAMES = ROUTE_NAMES;

  constructor(private router:Router){}

  routeTo(route:string){
    this.router.navigate([route])
  }

}
