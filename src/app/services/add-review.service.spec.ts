import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { AddReviewService } from './add-review.service';

describe('AddReviewService', () => {
  let service: AddReviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AddReviewService,
        provideHttpClient()
      ]
    });
    service = TestBed.inject(AddReviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
