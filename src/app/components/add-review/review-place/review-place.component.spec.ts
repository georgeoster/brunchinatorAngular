import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReviewPlaceComponent } from './review-place.component';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../../../models/User';
import { AddReviewService } from '../../../services/add-review.service';
import { UserService } from '../../../services/user.service';
import { dummyPlace, dummyUser } from '../../../utils/tests/mocks';


describe('ReviewPlaceComponent', () => {
  let component: ReviewPlaceComponent;
  let fixture: ComponentFixture<ReviewPlaceComponent>;
  let addReviewServiceStub: Partial<AddReviewService>;
  let userServiceStub: Partial<UserService>;
  let routerStub: Partial<Router>;

  // Create dummy Subjects for service observables
  const successfullyAddedReviewSubject = new Subject<boolean>();
  const addReviewErrorSubject = new Subject<any>();
  const userSubject = new Subject<User>();

  beforeEach(async () => {
    addReviewServiceStub = {
      addReview: jasmine.createSpy('addReview'),
      successfullyAddedReview: successfullyAddedReviewSubject,
      addReviewError: addReviewErrorSubject
    };

    userServiceStub = {
      user: userSubject
    };

    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [ReviewPlaceComponent, FormsModule],
      providers: [
        { provide: AddReviewService, useValue: addReviewServiceStub },
        { provide: UserService, useValue: userServiceStub },
        { provide: Router, useValue: routerStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReviewPlaceComponent);
    component = fixture.componentInstance;
    // Provide a dummy place for input
    component.place = dummyPlace;
    // Stub getImageForPlace function
    spyOn<any>(component, 'populateMainImageSrc').and.callThrough();
    // Trigger ngOnInit
    fixture.detectChanges();
  });

  it('populates mainImageSrc and sets review properties on ngOnInit', () => {
    component.populateMainImageSrc();
    expect(component.mainImageSrc).toEqual('google-places-image-url');
    expect(component.review.placeId).toEqual(component.place.place_id);
    expect(component.review.placeName).toEqual(component.place.name);
    expect(component.review.vicinity).toEqual(component.place.vicinity);
  });

  describe('formIsInvalid', () => {
    it('returns true when both burger and bloody are null', () => {
      component.review.burger = null;
      component.review.bloody = null;
      expect(component.formIsInvalid()).toBeTrue();
    });

    it('returns false when at least one rating is provided', () => {
      component.review.burger = 3;
      component.review.bloody = null;
      expect(component.formIsInvalid()).toBeFalse();
  
      component.review.burger = null;
      component.review.bloody = 4;
      expect(component.formIsInvalid()).toBeFalse();
  
      component.review.burger = 2;
      component.review.bloody = 5;
      expect(component.formIsInvalid()).toBeFalse();
    });
  });

  describe('handleRating', () => {
    it('updates review rating and resets error flag', () => {
      component.review.burger = null;
      component.noReviewError = true;
      component.handleRating(4, 'burger');
      expect(component.review.burger as unknown as number).toEqual(4);
      expect(component.noReviewError).toBeFalse();
  
      component.handleRating(3, 'bloody');
      expect(component.review.bloody as unknown as number).toEqual(3);
      expect(component.noReviewError).toBeFalse();
    });
  });

  describe('handlePostReview', () => {
    it('displays errors if form is invalid', () => {
      spyOn(component, 'displayErrors').and.callThrough();
      // Set form as invalid
      component.review.burger = null;
      component.review.bloody = null;
      component.handlePostReview();
      expect(component.displayErrors).toHaveBeenCalled();
    });
  
    it('calls addReviewService.addReview if form is valid', () => {
      // Set form as valid by providing at least one rating
      component.review.burger = 5;
      component.review.bloody = null;
      component.noReviewError = false;
      component.handlePostReview();
      expect(addReviewServiceStub.addReview).toHaveBeenCalledWith(component.review);
    });
  });

  it('subscribes to user and updates review.userName accordingly', () => {
    const testUser: User = dummyUser;
    userSubject.next(testUser);
    // Force change detection after emitting new user
    fixture.detectChanges();
    expect(component.review.userName).toEqual('tester');
  });

  it('navigates to home when successfullyAddedReview is emitted', () => {
    successfullyAddedReviewSubject.next(true);
    fixture.detectChanges();
    expect(routerStub.navigate).toHaveBeenCalledWith(['home']);
  });

  it('sets addReviewError to true when addReviewError is emitted', () => {
    addReviewErrorSubject.next({ message: 'Error occurred' });
    fixture.detectChanges();
    expect(component.addReviewError).toBeTrue();
  });

  it('unsubscribes from subscriptions on ngOnDestroy', () => {
    // Spy on unsubscribe methods
    spyOn(component.userSubscription, 'unsubscribe').and.callThrough();
    spyOn(component.successfullyAddedReviewSubscription, 'unsubscribe').and.callThrough();
    spyOn(component.addReviewErrorSubscription, 'unsubscribe').and.callThrough();

    component.ngOnDestroy();
    expect(component.userSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.successfullyAddedReviewSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.addReviewErrorSubscription.unsubscribe).toHaveBeenCalled();
  });
});
