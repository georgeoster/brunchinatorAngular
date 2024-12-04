import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HamburgerComponent } from './hamburger.component';
import { MenuService } from '../../../services/menu.service';

describe('HamburgerComponent', () => {
  let component: HamburgerComponent;
  let fixture: ComponentFixture<HamburgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HamburgerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HamburgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleMenu', () => {
    it('opens and closes navigation menu', () => {
      expect(component.menuOpen).toBeFalse();

      component.toggleMenu();
      expect(component.menuOpen).toBeTrue();

      component.toggleMenu();
      expect(component.menuOpen).toBeFalse();
    });
  });

  describe('clicking the hamburger', () => {
    it('calls toggleMenu when clicked', () => {
      const menuService:MenuService = TestBed.inject(MenuService);
      spyOn(menuService, 'openMenu').and.callThrough();
      spyOn(menuService, 'closeMenu').and.callThrough();
      spyOn(component, 'toggleMenu').and.callThrough();
      
      const hamburgerMenu = fixture.debugElement.nativeElement.querySelector('div');

      expect(component.menuOpen).toBeFalse();

      hamburgerMenu.click(); 
      expect(component.toggleMenu).toHaveBeenCalled();
      expect(menuService.openMenu).toHaveBeenCalledTimes(1);
      expect(menuService.closeMenu).toHaveBeenCalledTimes(0);
      expect(component.menuOpen).toBeTrue();

      hamburgerMenu.click();
      expect(component.toggleMenu).toHaveBeenCalled();
      expect(menuService.openMenu).toHaveBeenCalledTimes(1);
      expect(menuService.closeMenu).toHaveBeenCalledTimes(1);
      expect(component.menuOpen).toBeFalse();
    });
  });
});
