import { Component, Input } from '@angular/core';
import { getImageFromPlaceId } from '../../../utils/placeUtils';

@Component({
  selector: 'brunch-profile-place-card',
  imports: [],
  templateUrl: './profile-place-card.component.html',
  styleUrl: './profile-place-card.component.css'
})
export class ProfilePlaceCardComponent {
  @Input() placeName:string = 'Place';
  @Input() placeId:string = '1';
  mainImageSrc:string = '';

  ngOnInit() {
    this.populateMainImageSrc();
  }

  async populateMainImageSrc() {
    this.mainImageSrc = await getImageFromPlaceId(this.placeId);
  }
}
