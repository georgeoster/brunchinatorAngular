import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { GetPlacesService } from './get-places.service';

describe('GetReviewsService', () => {
  let service: GetPlacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetPlacesService,
        provideHttpClient()
      ]
    });
    service = TestBed.inject(GetPlacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
