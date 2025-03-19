import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HamburgerComponent } from './hamburger.component';
import { MenuService } from '../../../services/menu.service';
import { Subject } from 'rxjs';

describe('HamburgerComponent', () => {
  let component: HamburgerComponent;
  let fixture: ComponentFixture<HamburgerComponent>;
  let menuServiceStub: Partial<MenuService>;
  let openSubject: Subject<boolean>;

  beforeEach(async () => {
    openSubject = new Subject<boolean>();
    menuServiceStub = {
      // simulate menu open state
      open: openSubject.asObservable(),
      openMenu: jasmine.createSpy('openMenu').and.callFake(() => {
        openSubject.next(true);
      }),
      closeMenu: jasmine.createSpy('closeMenu').and.callFake(() => {
        openSubject.next(false);
      })
    };

    await TestBed.configureTestingModule({
      imports: [HamburgerComponent],
      providers: [
        { provide: MenuService, useValue: menuServiceStub }
      ]
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

  it('should update menuOpen when MenuService emits a new value', () => {
    // Emit true and check menuOpen becomes true
    openSubject.next(true);
    fixture.detectChanges();
    expect(component.menuOpen).toBeTrue();

    // Emit false and check menuOpen becomes false
    openSubject.next(false);
    fixture.detectChanges();
    expect(component.menuOpen).toBeFalse();
  });

  it('should apply correct CSS classes based on menuOpen state', () => {
    // When menuOpen is true, expect element to have class "hamburger"
    component.menuOpen = true;
    fixture.detectChanges();
    let divElement = fixture.debugElement.query(By.css('div'));
    expect(divElement.nativeElement.classList).toContain('hamburger');
    expect(divElement.nativeElement.classList).not.toContain('hamburgerClosed');

    // When menuOpen is false, expect element to have class "hamburgerClosed"
    component.menuOpen = false;
    fixture.detectChanges();
    divElement = fixture.debugElement.query(By.css('div'));
    expect(divElement.nativeElement.classList).toContain('hamburgerClosed');
    expect(divElement.nativeElement.classList).not.toContain('hamburger');
  });

  it('should unsubscribe from MenuService subscription on ngOnDestroy', () => {
    spyOn(component.menuServiceSubscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.menuServiceSubscription.unsubscribe).toHaveBeenCalled();
  });
});
