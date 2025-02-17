import { ChangeDetectorRef, Component } from '@angular/core';
import { FindPlaceComponent } from "./find-place/find-place.component";
import { ReviewPlaceComponent } from "./review-place/review-place.component";
import { autoCompletePlace } from '../../utils/types/all.types';

@Component({
  selector: 'brunch-add-review',
  imports: [FindPlaceComponent,  ReviewPlaceComponent],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})

export class AddReviewComponent {

  showFindPlace:boolean = true;
  showReviewPlace:boolean = false;
  place!: autoCompletePlace;

  constructor(private changeDetectorRef: ChangeDetectorRef){}

  handlePlaceSelected(place: autoCompletePlace) {
    this.showFindPlace = false;
    this.showReviewPlace = true;
    this.place = place;
    this.changeDetectorRef.detectChanges();
  }

}
