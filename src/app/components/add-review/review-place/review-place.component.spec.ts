import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ReviewPlaceComponent } from './review-place.component';
import { AddReviewService } from '../../../services/add-review.service';

describe('ReviewPlaceComponent', () => {
  let component: ReviewPlaceComponent;
  let fixture: ComponentFixture<ReviewPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewPlaceComponent],
      providers: [
        AddReviewService,
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewPlaceComponent);
    fixture.componentInstance.place = {
      place_id: '12345',
      name: 'test place',
      vicinity: '123 main st',
      formatted_phone_number: '(123) 456-7890',
      photos: []
    }
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
