import { Component, EventEmitter, Input, Output, } from '@angular/core';
import { NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'brunch-star-rating',
  imports: [NgClass, NgFor, FormsModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {

  @Input() title:string = '';
  @Output() rating = new EventEmitter();
  selectedOption: number = 0;
  options = [1,2,3,4,5];

  onOptionChange() {
    this.rating.emit(this.selectedOption);
  }
}
