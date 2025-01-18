import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Place } from '../../utils/types/all.types';
import { getImageFromPlaceId } from '../../utils/placeUtils';
import { PlaceReviewsComponent } from './place-reviews/place-reviews.component';

@Component({
  selector: 'brunch-place',
  imports: [PlaceReviewsComponent],
  templateUrl: './place.component.html',
  styleUrl: './place.component.css'
})
export class PlaceComponent {
  place!: Place;
  mainImageSrc:string = '';

  constructor(public router: Router) {
    const currentNav = this.router.getCurrentNavigation();
    this.place = currentNav?.extras.state?.['place'];
  }

  ngOnInit(){
    this.populateMainImageSrc()
  }

  async populateMainImageSrc() {
    this.mainImageSrc =  await getImageFromPlaceId(this.place?.placeId);
  }
}
