import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { GetReviewsService } from './get-reviews.service';

describe('GetReviewsService', () => {
  let service: GetReviewsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetReviewsService,
        provideHttpClient()
      ]
    });
    service = TestBed.inject(GetReviewsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
