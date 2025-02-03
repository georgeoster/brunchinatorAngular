import { Component } from '@angular/core';
import { CardComponent } from '../uiComponents/card/card.component';

@Component({
  selector: 'brunch-home',
  imports: [CardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
