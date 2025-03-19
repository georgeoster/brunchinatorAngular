import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ProfileReviewsComponent } from './profile-reviews.component';
import { Review } from '../../../models/Review';
import { GetReviewsService } from '../../../services/get-reviews.service';
import { dummyReviewOne, dummyReviewTwo, dummyReviewThree } from '../../../utils/tests/mocks'; // Adjust the path as needed

// Fake service to simulate review emissions
class FakeGetReviewsService {
  reviewsByUserName = new Subject<Review[]>();
  getReviewsByUserName = jasmine.createSpy('getReviewsByUserName');
}

describe('ProfileReviewsComponent', () => {
  let component: ProfileReviewsComponent;
  let fixture: ComponentFixture<ProfileReviewsComponent>;
  let fakeGetReviewsService: FakeGetReviewsService;
  let router: Router;

  beforeEach(async () => {
    fakeGetReviewsService = new FakeGetReviewsService();
    await TestBed.configureTestingModule({
      imports: [ProfileReviewsComponent],
      providers: [
        provideHttpClient(),
        { provide: GetReviewsService, useValue: fakeGetReviewsService }
      ],
      schemas: [NO_ERRORS_SCHEMA] // Ignore unknown elements (custom components)
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileReviewsComponent);
    component = fixture.componentInstance;
    // Set a default userName for title getter usage.
    component.userName = 'TestUser';
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return correct title for signed in user', () => {
    component.profileIsSignedInUser = true;
    expect(component.title).toBe('Places I have been');
  });

  it('should return correct title for another user', () => {
    component.profileIsSignedInUser = false;
    component.userName = 'Alice';
    expect(component.title).toBe('Places Alice has been');
  });

  it('should format a valid date correctly', () => {
    const formatted = component.formatDate('2023-02-10T00:00:00');
    expect(formatted).toBe('Feb 10, 2023');
  });

  it('should return empty string for an invalid date', () => {
    const formatted = component.formatDate('invalid-date');
    expect(formatted).toBe('');
  });

  it('should sort reviews in descending order by reviewDate', () => {
    // dummyReviewTwo: Feb 10, dummyReviewThree: Jan 20, dummyReviewOne: Jan 15
    const reviews: Review[] = [dummyReviewOne, dummyReviewTwo, dummyReviewThree];
    fakeGetReviewsService.reviewsByUserName.next(reviews);
    fixture.detectChanges();
    expect(component.reviews[0].reviewDate).toBe(dummyReviewTwo.reviewDate);
    expect(component.reviews[1].reviewDate).toBe(dummyReviewThree.reviewDate);
    expect(component.reviews[2].reviewDate).toBe(dummyReviewOne.reviewDate);
  });

  it('should navigate to the correct place when navigateToPlace is called', () => {
    spyOn(router, 'navigateByUrl');
    component.navigateToPlace(dummyReviewTwo);
    expect(router.navigateByUrl).toHaveBeenCalledWith(`/place/${dummyReviewTwo.placeId}`);
  });

  it('should unsubscribe from reviews subscription on destroy', () => {
    spyOn(component.getReviewsServiceSubscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.getReviewsServiceSubscription.unsubscribe).toHaveBeenCalled();
  });

  it('should render review elements in the template', () => {
    // Manually set the reviews with two dummy reviews
    component.reviews = [dummyReviewOne, dummyReviewTwo];
    fixture.detectChanges();
    const compiled = fixture.nativeElement;

    // Verify that the title is rendered
    expect(compiled.querySelector('.title').textContent).toContain(component.title);

    // Check that the correct number of review containers are rendered
    const reviewContainers = compiled.querySelectorAll('.flex-row.container');
    expect(reviewContainers.length).toBe(2);

    // Verify that each review displays the correctly formatted date and words
    const dateElements = compiled.querySelectorAll('.date');
    expect(dateElements[0].textContent).toContain(component.formatDate(dummyReviewOne.reviewDate));
    expect(dateElements[1].textContent).toContain(component.formatDate(dummyReviewTwo.reviewDate));

    const wordsElements = compiled.querySelectorAll('.words');
    expect(wordsElements[0].textContent).toContain(dummyReviewOne.words);
    expect(wordsElements[1].textContent).toContain(dummyReviewTwo.words);
  });
});
