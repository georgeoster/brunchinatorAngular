import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { autoCompletePlace } from '../../../models/AutoCompletePlace';

declare const google: any;

@Component({
  selector: 'app-places-autocomplete',
  imports: [FormsModule, NgClass],
  templateUrl: './places-autocomplete.component.html',
  styleUrl: './places-autocomplete.component.css'
})

export class PlacesAutocompleteComponent {
  
  @Input() hasError:boolean = false;
  @Input() errorMessage:string = '';

  @Output() placeSelected: EventEmitter<autoCompletePlace> = new EventEmitter();
  @ViewChild('placeInput') placeInput: any;

  placeName: string = '';
  inputAutocompleteWrapper: any;
  autoCompleteOptions:{} =  {
    componentRestrictions: { country: 'US' },
    types: ['establishment'],
    fields: ['place_id', 'name', 'vicinity', 'formatted_phone_number', 'photos']
  }

  constructor(){
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    this.inputAutocompleteWrapper = new google.maps.places.Autocomplete(
      this.placeInput.nativeElement,
      this.autoCompleteOptions
    );
    this.inputAutocompleteWrapper.addListener('place_changed', () => {
      const place:autoCompletePlace = this.inputAutocompleteWrapper.getPlace();
      this.placeSelected.emit(place);
    });
  }
}
