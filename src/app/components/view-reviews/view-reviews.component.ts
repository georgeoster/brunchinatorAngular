import { ChangeDetectorRef, Component } from '@angular/core';
import { PlaceCardComponent } from '../uiComponents/place-card/place-card.component';
import { Place, serviceError } from '../../utils/types/all.types';
import { GetPlacesService } from '../../services/get-places.service';
import { Subscription } from 'rxjs';
import { NgFor, NgIf } from '@angular/common';
import { ErrorMessageComponent } from '../uiComponents/error-message/error-message.component';

@Component({
  selector: 'brunch-view-reviews',
  imports: [PlaceCardComponent, ErrorMessageComponent, NgFor, NgIf],
  templateUrl: './view-reviews.component.html',
  styleUrl: './view-reviews.component.css'
})
export class ViewReviewsComponent {

  places: Array<Place> = [];
  getPlacesSubscription:Subscription = new Subscription;
  getPlacesErrorSubscription: Subscription = new Subscription;
  getPlacesError:boolean = false;
  errorMessage:string = 'Something went wrong. Please try again later.'

  constructor(private getPlacesService: GetPlacesService, private changeDetectorRef: ChangeDetectorRef) {
    this.subscribeToGetPlacesSubscription();
    this.subscribeToGetPlacesError();
  }

  ngOnDestroy() {
    this.getPlacesSubscription.unsubscribe();
    this.getPlacesErrorSubscription.unsubscribe();
  }

  subscribeToGetPlacesSubscription() {
    this.getPlacesSubscription = this.getPlacesService.places.subscribe((places:Array<Place>) => {
      this.places = places;
    });
    this.getPlacesService.getPlaces();
  }

  subscribeToGetPlacesError() {
    this.getPlacesErrorSubscription = this.getPlacesService.getPlacesError.subscribe((error:serviceError) => {
      console.error(error);
      this.getPlacesError = true;
      this.changeDetectorRef.detectChanges();
    });
  }
}
