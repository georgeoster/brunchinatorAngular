import { Component } from '@angular/core';
import { TextInputComponent } from '../uiComponents/text-input/text-input.component';
import { CardComponent } from '../uiComponents/card/card.component';

@Component({
  selector: 'brunch-add-review',
  imports: [TextInputComponent, CardComponent],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent {

  valueFromBrunchTextInput:string = '';

}
