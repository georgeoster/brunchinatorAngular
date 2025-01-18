import { ChangeDetectorRef, Component, Input } from '@angular/core';
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
  @Input() place: Place = {
    placeId: 'ChIJOaE5coXIxokRpQt1kuCvTZs',
    placeName: 'Royal Boucherie',
    bloody: 4,
    burger: 5,
    numberOfReviews: 1,
    overallRating: 4.5
   };
  mainImageSrc:string = '';

  ngOnInit(){
    this.populateMainImageSrc()
  }

  async populateMainImageSrc() {
    this.mainImageSrc =  await getImageFromPlaceId(this.place.placeId);
  }
}
