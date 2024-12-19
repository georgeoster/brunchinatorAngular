import { Component, EventEmitter, Output } from '@angular/core';
import { PlacesAutocompleteComponent } from '../../uiComponents/places-autocomplete/places-autocomplete.component';
import { autoCompletePlace } from '../../../types/all.types';

@Component({
  selector: 'app-find-place',
  imports: [PlacesAutocompleteComponent],
  templateUrl: './find-place.component.html',
  styleUrl: './find-place.component.css'
})

export class FindPlaceComponent {

  @Output() placeSelected: EventEmitter<autoCompletePlace> = new EventEmitter();


  handlePlaceSelected(place: autoCompletePlace) {
    this.placeSelected.emit(place);
  }
}
