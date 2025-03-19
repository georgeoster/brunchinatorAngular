import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AddReviewComponent } from './add-review.component';
import { FormsModule } from '@angular/forms';
import { dummyPlace } from '../../utils/tests/mocks';
import { provideHttpClient } from '@angular/common/http';

describe('AddReviewComponent', () => {
  let component: AddReviewComponent;
  let fixture: ComponentFixture<AddReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddReviewComponent, FormsModule],
      providers: [
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AddReviewComponent);
    component = fixture.componentInstance;
    component.place = dummyPlace;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initially display FindPlaceComponent and not display ReviewPlaceComponent', () => {
    // showFindPlace should be true and showReviewPlace false
    expect(component.showFindPlace).toBeTrue();
    expect(component.showReviewPlace).toBeFalse();

    // FindPlaceComponent should be present, ReviewPlaceComponent should be absent.
    const FindPlaceComponent = fixture.debugElement.query(By.css('app-find-place'));
    const ReviewPlaceComponent = fixture.debugElement.query(By.css('app-review-place'));
    expect(FindPlaceComponent).toBeTruthy();
    expect(ReviewPlaceComponent).toBeNull();
  });

  it('should update state and DOM when handlePlaceSelected is called', () => {
    // Call the method
    component.handlePlaceSelected(dummyPlace);
    fixture.detectChanges();

    // State expectations
    expect(component.showFindPlace).toBeFalse();
    expect(component.showReviewPlace).toBeTrue();
    expect(component.place).toEqual(dummyPlace);

    // FindPlaceComponent should not be rendered, and ReviewPlaceComponent should be rendered.
    const FindPlaceComponent = fixture.debugElement.query(By.css('app-find-place'));
    const ReviewPlaceComponent = fixture.debugElement.query(By.css('app-review-place'));
    expect(FindPlaceComponent).toBeNull();
    expect(ReviewPlaceComponent).toBeTruthy();
  });
});
