import { Component } from '@angular/core';
import { TextInputComponent } from '../uiComponents/text-input/text-input.component';
import { CardComponent } from '../uiComponents/card/card.component';
import { StarRatingComponent } from '../uiComponents/star-rating/star-rating.component';
import { PlacesAutocompleteComponent } from "../uiComponents/places-autocomplete/places-autocomplete.component";

@Component({
  selector: 'brunch-add-review',
  imports: [TextInputComponent, CardComponent, StarRatingComponent, PlacesAutocompleteComponent],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent {

  valueFromBrunchTextInput:string = '';

  handleRating(rating:number) {
    console.log('add review received: ' + rating);
  }

  getEstablishmentAddress(place: object) {//called when google places component emits location

    console.log('getEstablishmentAddress fires!');
    console.log(place);

    // this.noPlace = false;
    // this.placeErrorMessage = '';

    // set map
    // this.setMap(place['formatted_address'],15);

    // this.brunchPlace = place['name'];
    // this.placeId = place['place_id'];

    // this.establishmentAddress = place['formatted_address'];
    // this.phone = this.getPhone(place);
    // this.formattedEstablishmentAddress = place['formatted_address'];
    // this.zone.run(() => {
    //   this.formattedEstablishmentAddress = place['formatted_address'];
    //   this.phone = place['formatted_phone_number'];
    // });

    //this.image1 = place['photos'][0].getUrl({'maxWidth': 300, 'maxHeight': 300});
    //this.image2 = place['photos'][1].getUrl({'maxWidth': 300, 'maxHeight': 300});
    //this.image3 = place['photos'][2].getUrl({'maxWidth': 300, 'maxHeight': 300});
   
  }

}
