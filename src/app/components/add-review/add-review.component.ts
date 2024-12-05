import { Component } from '@angular/core';
import { TextInputComponent } from '../formComponents/text-input/text-input.component';

@Component({
  selector: 'brunch-add-review',
  imports: [TextInputComponent],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent {

  valueFromBrunchTextInput:string = '';

}
