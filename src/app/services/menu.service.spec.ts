import { TestBed } from '@angular/core/testing';

import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('open observable', () => {
    it('initially sets open to false', () => {
      let result;
      service.open.subscribe(open => {
        result = open;
      });
      expect(result).toBeFalse();
    });
  });

  describe('openMenu', () => {
    it('sets open observable to true', () => {
      let result;
      service.open.subscribe(open => {
        result = open;
      });
      expect(result).toBeFalse();

      service.openMenu();
      expect(result).toBeTrue();
    });
  });

  describe('closeMenu', () => {
    it('sets open observable to false', () => {
      let result;
      service.open.subscribe(open => {
        result = open;
      });
      expect(result).toBeFalse();

      service.openMenu();
      expect(result).toBeTrue();

      service.closeMenu();
      expect(result).toBeFalse();
    });
  });
});
