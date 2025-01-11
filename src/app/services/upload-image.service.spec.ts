import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { UploadImageService } from './upload-image.service';

describe('UploadImageService', () => {
  let service: UploadImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UploadImageService,
        provideHttpClient()
      ]
    });
    service = TestBed.inject(UploadImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
