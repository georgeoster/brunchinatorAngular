import { Component, ElementRef, Input, ViewChild } from '@angular/core';
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
  @ViewChild('map', { static: false }) map!: ElementRef;
  starRating!:number;
  mainImageSrc:string = '';
  cardStyle: string = '';

  ngOnInit() {
    const rating = this.place?.overallRating ?? 0;
    this.starRating = Math.round(rating) ?? 0;
  }

  ngAfterViewInit() {
    this.populateMainImageSrc();
  }

  async populateMainImageSrc() {
    const placeId = this.place?.placeId ?? '1';
    this.mainImageSrc = await getImageFromPlaceId(placeId, this.map.nativeElement);
    this.cardStyle = `background-image: linear-gradient(to top, #0f1a0f, transparent  33%), url('${this.mainImageSrc}');`;
  }

  placeName() {
    return this.place?.placeName ?? 'place';
  }

  numberOfReviews() {
    return this.place?.numberOfReviews ?? '0';
  }
}
