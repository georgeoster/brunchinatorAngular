import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserComponent } from './user.component';
import { ButtonComponent } from '../../uiComponents/button/button.component';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { MenuService } from '../../../services/menu.service';
import { ROUTE_NAMES } from '../../../models/RouteNames';
import { dummyUser } from '../../../utils/tests/mocks';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;
  let routerStub: Partial<Router>;
  let userSubject: Subject<User>;
  let menuServiceStub: Partial<MenuService>;
  let userServiceStub: Partial<UserService>;

  beforeEach(async () => {
    // Create a subject to simulate user observable
    userSubject = new Subject<User>();

    // Stub for Router
    routerStub = {
      navigate: jasmine.createSpy('navigate'),
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };

    // Stub for MenuService with just the closeMenu method
    menuServiceStub = {
      closeMenu: jasmine.createSpy('closeMenu')
    };

    // Stub for UserService exposing the user observable
    userServiceStub = {
      user: userSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [UserComponent],
      providers: [
        provideHttpClient(),
        { provide: Router, useValue: routerStub },
        { provide: MenuService, useValue: menuServiceStub },
        { provide: UserService, useValue: userServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('UI when user is not logged in', () => {
    it('should display Sign In and Register buttons when not logged in', () => {
      // When no user is emitted, isLoggedIn remains false.
      expect(component.isLoggedIn).toBeFalse();

      // Query for button components
      const ButtonComponents = fixture.debugElement.queryAll(By.directive(ButtonComponent));
      expect(ButtonComponents.length).toBeGreaterThanOrEqual(2);

      // Verify that the rendered HTML contains "Sign In" and "Register"
      const compiledComponent = fixture.nativeElement as HTMLElement;
      expect(compiledComponent.innerHTML).toContain('Sign In');
      expect(compiledComponent.innerHTML).toContain('Register');
    });
  });

  describe('UI when user is logged in', () => {
    const testUser: User = dummyUser;

    beforeEach(() => {
      // Emit a user so that the component reflects a logged in state
      userSubject.next(testUser);
      fixture.detectChanges();
    });

    it('should display the username when logged in', () => {
      expect(component.isLoggedIn).toBeTrue();
      const userDiv = fixture.debugElement.query(By.css('.userName'));
      expect(userDiv).toBeTruthy();
      expect(userDiv.nativeElement.textContent).toContain(testUser.userName);
    });

    it('should call navigateToProfile when username is clicked', () => {
      spyOn(component, 'navigateToProfile').and.callThrough();
      const userDiv = fixture.debugElement.query(By.css('.userName'));
      userDiv.triggerEventHandler('click', null);
      expect(component.navigateToProfile).toHaveBeenCalledWith(ROUTE_NAMES.PROFILE);
      // Check that router.navigateByUrl is called with correct URL
      expect(routerStub.navigateByUrl).toHaveBeenCalledWith(`/${ROUTE_NAMES.PROFILE}/${testUser.userName}`);
      // Also expect that menuService.closeMenu has been called.
      expect(menuServiceStub.closeMenu).toHaveBeenCalled();
    });
  });

  describe('routeTo', () => {
    it('should navigate to the given route and close the menu', () => {
      component.routeTo(ROUTE_NAMES.SIGN_IN);
      expect(routerStub.navigate).toHaveBeenCalledWith([ROUTE_NAMES.SIGN_IN]);
      expect(menuServiceStub.closeMenu).toHaveBeenCalled();
    });
  });

  describe('Subscription Management', () => {
    it('should unsubscribe from userSubscription on ngOnDestroy', () => {
      spyOn(component.userSubscription, 'unsubscribe').and.callThrough();
      component.ngOnDestroy();
      expect(component.userSubscription.unsubscribe).toHaveBeenCalled();
    });
  });
});
