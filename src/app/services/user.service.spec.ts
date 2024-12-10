import { TestBed } from '@angular/core/testing';

import { provideHttpClient } from '@angular/common/http';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserService,
        provideHttpClient()
      ]
    });
    service = TestBed.inject(UserService);

  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('isLoggedIn observable', () => {
    it('initially sets open to false', () => {
      let result;
      service.isLoggedIn.subscribe(isLoggedIn => {
        result = isLoggedIn;
      });
      expect(result).toBeFalse();
    });
  });
});
