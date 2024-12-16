import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';

declare const google: any;

type toEmit = {
  place_id: string,
}

@Component({
  selector: 'app-places-autocomplete',
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './places-autocomplete.component.html',
  styleUrl: './places-autocomplete.component.css'
})
export class PlacesAutocompleteComponent {
  @Input() hasError:boolean = false;
  @Input() errorMessage:string = '';

  @Output() placeSelected: EventEmitter<toEmit> = new EventEmitter();
  @ViewChild('placeInput') placeInput: any;

  placeName: string = '';
  inputAutocompleteWrapper: any;
  autoCompleteOptions:{} =  {
    componentRestrictions: { country: 'US' },
    types: ['establishment'],
    fields: ['place_id']
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
      const place = this.inputAutocompleteWrapper.getPlace();
      this.placeSelected.emit(place);
    });
  }
}
