import { ChangeDetectorRef, Component, EventEmitter, Input, Output, } from '@angular/core';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'brunch-star-rating',
  imports: [NgClass, FormsModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {

  @Input() title:string = '';
  @Input() showTitle:boolean = true;
  @Output() rating = new EventEmitter();
  @Input() hasError:boolean = false;
  @Input() small:boolean = false;
  errorMessage:string = 'At least one rating must be done.'
  @Input() selectedOption: number | null = 0;
  options = [1,2,3,4,5];

  constructor(private changeDetectorRef: ChangeDetectorRef){}

  onOptionChange() {
    this.changeDetectorRef.detectChanges();
    this.rating.emit(this.selectedOption);
  }

}
