import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPlaceComponent } from './review-place.component';

describe('ReviewPlaceComponent', () => {
  let component: ReviewPlaceComponent;
  let fixture: ComponentFixture<ReviewPlaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReviewPlaceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewPlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
