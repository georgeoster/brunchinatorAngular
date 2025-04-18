import { ChangeDetectorRef, Component } from '@angular/core';
import { PlaceCardComponent } from '../uiComponents/place-card/place-card.component';
import { serviceError } from '../../models/ServiceError';
import { Place } from '../../models/Place';
import { GetPlacesService } from '../../services/get-places.service';
import { Subscription } from 'rxjs';
import { ErrorMessageComponent } from '../uiComponents/error-message/error-message.component';
import { Router } from '@angular/router';

@Component({
  selector: 'brunch-view-reviews',
  imports: [PlaceCardComponent, ErrorMessageComponent],
  templateUrl: './view-reviews.component.html',
  styleUrl: './view-reviews.component.css'
})
export class ViewReviewsComponent {

  loading: boolean = true;
  places: Array<Place> = [];
  getPlacesSubscription:Subscription = new Subscription;
  getPlacesErrorSubscription: Subscription = new Subscription;
  getPlacesError:boolean = false;
  errorMessage:string = 'Something went wrong. Please try again later.'

  constructor(private getPlacesService: GetPlacesService, private changeDetectorRef: ChangeDetectorRef, private router: Router) {
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
      if(this.places?.length > 0) {
        this.loading = false;
      }
    });
    this.getPlacesService.getPlaces();
  }

  subscribeToGetPlacesError() {
    this.getPlacesErrorSubscription = this.getPlacesService.getPlacesError.subscribe((error:serviceError) => {
      console.error(error);
      this.getPlacesError = true;
      this.changeDetectorRef.detectChanges();
      this.loading = false;
    });
  }

  navigateTo(place: Place) {
    this.router.navigateByUrl('/place', {
      state: { place, }
    });
  }
}
