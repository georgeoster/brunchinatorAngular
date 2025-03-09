import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Place } from '../../models/Place';
import { getImageFromPlaceId } from '../../utils/placeUtils';
import { PlaceReviewsComponent } from './place-reviews/place-reviews.component';
import { GetPlacesService } from '../../services/get-places.service';

@Component({
  selector: 'brunch-place',
  imports: [PlaceReviewsComponent],
  templateUrl: './place.component.html',
  styleUrl: './place.component.css'
})
export class PlaceComponent {
  @ViewChild('map', { static: false }) map!: ElementRef;
  place!: Place;
  placeId:string = '';
  mainImageSrc:string = '';

  constructor(public router: Router, private activatedRoute:ActivatedRoute, private getPlacesService:GetPlacesService) {
    this.activatedRoute.paramMap.subscribe((params) => {
      this.placeId = params.get('placeId') ?? '';
      if(this.placeId !== '') {
        this.populatePlaceFromRouteParam();
      } else {
        this.populatePlaceFromState();
      }
    });
  }

  populatePlaceFromRouteParam() {
    this.getPlacesService.placeByPlaceId.subscribe((place:Place) => {
      this.place = place;
      this.populateMainImageSrc();
    });
    this.getPlacesService.getPlaceByPlaceId(this.placeId);
  }

  populatePlaceFromState() {
    const currentNav = this.router.getCurrentNavigation();
    this.place = currentNav?.extras.state?.['place'];
    this.populateMainImageSrc();
  }

  get placeName() {
    return this.place?.placeName ?? '';
  }

  get placeIdToPass() {
    return this.place?.placeId ?? this.placeId;
  }

  get vicinity() {
    return this.place?.vicinity ?? '';
  }

  ngAfterViewInit() {
    this.populateMainImageSrc();
  }

  async populateMainImageSrc() {
    this.mainImageSrc =  await getImageFromPlaceId(this.placeIdToPass, this.map.nativeElement);
  }
}
