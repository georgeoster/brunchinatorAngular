import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewReviewsComponent } from './view-reviews.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Place } from '../../models/Place';
import { GetPlacesService } from '../../services/get-places.service';
import { ChangeDetectorRef } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

describe('ViewReviewsComponent', () => {
  let component: ViewReviewsComponent;
  let fixture: ComponentFixture<ViewReviewsComponent>;
  let getPlacesServiceMock: any;
  let router: Router;
  let changeDetectorSpy: { detectChanges: jasmine.Spy };

  beforeEach(async () => {
    // Create a mock for GetPlacesService with Subjects for observables and a spy for the getPlaces method.
    getPlacesServiceMock = {
      places: new Subject<Place[]>(),
      getPlacesError: new Subject<any>(),
      getPlaces: jasmine.createSpy('getPlaces')
    };

    // Provide a stub for ChangeDetectorRef.
    changeDetectorSpy = { detectChanges: jasmine.createSpy('detectChanges') };

    await TestBed.configureTestingModule({
      imports: [ViewReviewsComponent],
      providers: [
        provideHttpClient(),
        { provide: GetPlacesService, useValue: getPlacesServiceMock },
        { provide: ChangeDetectorRef, useValue: changeDetectorSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewReviewsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('subscription behavior', () => {
    it('calls getPlacesService.getPlaces on initialization', () => {
      // getPlacesService.getPlaces is called in subscribeToGetPlacesSubscription() in the constructor.
      expect(getPlacesServiceMock.getPlaces).toHaveBeenCalled();
    });

    it('updates places and stops loading when places are emitted', () => {
      const testPlaces: Place[] = [
        {
          placeId: '1',
          placeName: 'Place 1',
          vicinity: 'Area 1',
          burger: 10,
          bloody: 5,
          numberOfReviews: 100,
          overallRating: 4.5
        },
        {
          placeId: '2',
          placeName: 'Place 2',
          vicinity: 'Area 2',
          burger: 20,
          bloody: 3,
          numberOfReviews: 150,
          overallRating: 4.0
        }
      ];
      // Emit test places.
      getPlacesServiceMock.places.next(testPlaces);
      fixture.detectChanges();
    
      expect(component.places).toEqual(testPlaces);
      expect(component.loading).toBeFalse();
    });
    

    it('sets getPlacesError to true and stops loading when an error is emitted', () => {
      // Emit an error.
      getPlacesServiceMock.getPlacesError.next({ statusCode: 500, message: 'Server Error' });
      fixture.detectChanges();

      expect(component.getPlacesError).toBeTrue();
      expect(component.loading).toBeFalse();
    });
  });

  describe('template rendering', () => {
    it('displays loader when loading is true', () => {
      component.loading = true;
      fixture.detectChanges();
      const loaderElement = fixture.debugElement.nativeElement.querySelector('.loader');
      expect(loaderElement).toBeTruthy();
    });

    it('does not display loader when loading is false', () => {
      component.loading = false;
      fixture.detectChanges();
      const loaderElement = fixture.debugElement.nativeElement.querySelector('.loader');
      expect(loaderElement).toBeNull();
    });
  });

  describe('navigation behavior', () => {
    it('calls router.navigateByUrl with correct arguments when navigateTo is called', () => {
      const navigateSpy = spyOn(router, 'navigateByUrl');
      const testPlace: Place = {
        placeId: '1',
        placeName: 'Place 1',
        vicinity: 'Area 1',
        burger: 10,
        bloody: 5,
        numberOfReviews: 100,
        overallRating: 4.5
      };
      component.navigateTo(testPlace);
      expect(navigateSpy).toHaveBeenCalledWith('/place', { state: { place: testPlace } });
    });
  });
});
