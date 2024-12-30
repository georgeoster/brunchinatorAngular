import { Component, Input } from '@angular/core';
import { Place } from '../../../utils/types/all.types';
import { getImageFromPlaceId } from '../../../utils/placeUtils';
import { StarRatingComponent } from '../star-rating/star-rating.component';

@Component({
  selector: 'app-place-card',
  imports: [StarRatingComponent],
  templateUrl: './place-card.component.html',
  styleUrl: './place-card.component.css'
})
export class PlaceCardComponent {
  @Input() place!:Place;
  starRating!:number;
  mainImageSrc:string = '';
  cardStyle: string = '';

  ngOnInit() {
    this.populateMainImageSrc();
    const rating = this.place?.overallRating ?? 0;
    this.starRating = Math.round(rating) ?? 0;
  }

  async populateMainImageSrc() {
    const placeId = this.place?.placeId ?? '1';
    this.mainImageSrc = await getImageFromPlaceId(placeId);
    this.cardStyle = `background-image: linear-gradient(to top, #465358, transparent  33%), url('${this.mainImageSrc}');`;
  }

  placeName() {
    return this.place?.placeName ?? 'place';
  }

  numberOfReviews() {
    return this.place?.numberOfReviews ?? '0';
  }
}
