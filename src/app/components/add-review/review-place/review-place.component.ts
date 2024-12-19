import { Component, Input } from '@angular/core';
import { autoCompletePlace } from '../../../types/all.types';
import { StarRatingComponent } from '../../uiComponents/star-rating/star-rating.component';
import { CardComponent } from '../../uiComponents/card/card.component';
import { ButtonComponent } from '../../uiComponents/button/button.component';

@Component({
  selector: 'app-review-place',
  imports: [CardComponent, StarRatingComponent, ButtonComponent],
  templateUrl: './review-place.component.html',
  styleUrl: './review-place.component.css'
})
export class ReviewPlaceComponent {

  @Input() place!: autoCompletePlace;
  mainImageSrc:string = '';

  constructor() {
  }

  ngOnInit(){
    this.populateMainImageSrc()
  }
    
  populateMainImageSrc() {
    this.mainImageSrc = this.place?.photos?.[0]?.getUrl({'maxWidth': 600, 'maxHeight': 600});
  }

  handleRating(e:any) {
    console.log('e');
    console.log(e);
  }
}
