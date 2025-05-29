import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Place } from '../../../models/Place';
import { getImageFromPlaceId } from '../../../utils/placeUtils';
import { StarRatingComponent } from '../star-rating/star-rating.component';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-place-card',
  imports: [StarRatingComponent, NgStyle],
  templateUrl: './place-card.component.html',
  styleUrl: './place-card.component.css'
})
export class PlaceCardComponent {
  @Input() place!:Place;
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
    this.mainImageSrc = await getImageFromPlaceId(placeId);
    this.cardStyle = `url('${this.mainImageSrc}')`;

  }

  placeName() {
    return this.place?.placeName ?? 'place';
  }

  numberOfReviews() {
    return this.place?.numberOfReviews ?? '0';
  }
}
