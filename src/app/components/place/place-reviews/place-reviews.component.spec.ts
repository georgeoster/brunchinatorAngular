import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { PlaceReviewsComponent } from './place-reviews.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Review } from '../../../models/Review';
import { GetReviewsService } from '../../../services/get-reviews.service';
import { provideHttpClient } from '@angular/common/http';
import { dummyReviewOne, dummyReviewThree, dummyReviewTwo } from '../../../utils/tests/mocks';

describe('PlaceReviewsComponent', () => {
  let component: PlaceReviewsComponent;
  let fixture: ComponentFixture<PlaceReviewsComponent>;
  let routerStub: Partial<Router>;
  let getReviewsServiceStub: Partial<GetReviewsService>;
  let reviewsByPlaceIdSubject: Subject<Review[]>;

  // Dummy reviews with all required fields
  const dummyReviews: Review[] = [dummyReviewOne, dummyReviewTwo, dummyReviewThree];

  beforeEach(waitForAsync(() => {
    reviewsByPlaceIdSubject = new Subject<Review[]>();

    routerStub = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };

    getReviewsServiceStub = {
      // Expose the reviewsByPlaceId observable as our subject.
      reviewsByPlaceId: reviewsByPlaceIdSubject.asObservable(),
      // Stub getReviewsByPlaceId to emit dummy reviews.
      getReviewsByPlaceId: jasmine.createSpy('getReviewsByPlaceId').and.callFake((placeId: string) => {
        reviewsByPlaceIdSubject.next(dummyReviews);
      })
    };

    TestBed.configureTestingModule({
      imports: [PlaceReviewsComponent],
      providers: [
        provideHttpClient(),
        { provide: Router, useValue: routerStub },
        { provide: GetReviewsService, useValue: getReviewsServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceReviewsComponent);
    component = fixture.componentInstance;
    // Set a dummy placeId as input
    component.placeId = 'p123';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit and subscription', () => {
    it('should call getReviewsByPlaceId on ngOnInit and subscribe to reviewsByPlaceId', fakeAsync(() => {
      component.ngOnInit();
      expect(getReviewsServiceStub.getReviewsByPlaceId).toHaveBeenCalledWith('p123');
      // Emit dummy reviews.
      reviewsByPlaceIdSubject.next(dummyReviews);
      tick();
      fixture.detectChanges();
      // Reviews should be sorted in descending order by reviewDate.
      const expected = [...dummyReviews].sort((a, b) => +new Date(b.reviewDate) - +new Date(a.reviewDate));
      expect(component.reviews).toEqual(expected);
    }));
  });

  describe('formatDate', () => {
    it('should format a valid date correctly', () => {
      // For date "2023-02-10", expected output is "Feb 10, 2023"
      const formatted = component.formatDate('2023-02-10T00:00:00');
      expect(formatted).toEqual('Feb 10, 2023');
    });

    it('should handle an invalid date gracefully', () => {
      const formatted = component.formatDate('invalid-date');
      expect(formatted).toEqual('');
      expect(typeof formatted).toEqual('string');
    });
  });

  describe('navigateToProfileFor', () => {
    it('should navigate to the correct profile URL', () => {
      const testReview: Review = dummyReviews[0];
      component.navigateToProfileFor(testReview);
      expect(routerStub.navigateByUrl).toHaveBeenCalledWith(`/profile/${testReview.userName}`);
    });
  });
});
