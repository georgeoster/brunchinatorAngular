import { ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'brunch-star-rating',
  imports: [NgClass, NgFor, FormsModule, NgIf],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {

  @Input() title:string = '';
  @Output() rating = new EventEmitter();
  @Input() hasError:boolean = false;
  errorMessage:string = 'At least one rating must be done.'
  selectedOption: number = 0;
  options = [1,2,3,4,5];

  constructor(private changeDetectorRef: ChangeDetectorRef){}

  onOptionChange() {
    this.changeDetectorRef.detectChanges();
    this.rating.emit(this.selectedOption);
  }
}
