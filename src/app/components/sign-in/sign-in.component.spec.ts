import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignInComponent } from './sign-in.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { provideHttpClient } from '@angular/common/http';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  let userServiceMock: any;
  let router: Router;

  beforeEach(async () => {
    // Create a mock for the UserService
    userServiceMock = {
      signIn: jasmine.createSpy('signIn'),
      user: new Subject<User>(),
      userServiceError: new Subject<any>()
    };

    await TestBed.configureTestingModule({
      imports: [SignInComponent],
      providers: [
        provideHttpClient(),
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when fields do not pass local validation', () => {
    it('sets local hasErrors booleans accordingly', () => {
      expect(component.userNameHasErrors).toBeFalse();
      expect(component.passwordHasErrors).toBeFalse();

      component.handleSignIn();
      fixture.detectChanges();

      expect(component.userNameHasErrors).toBeTrue();
      expect(component.passwordHasErrors).toBeTrue();
    });

    it('displays error messages', () => {
      const container = fixture.debugElement.nativeElement.querySelectorAll('div')[2];
      expect(container.innerHTML).not.toContain('UserName is required');
      expect(container.innerHTML).not.toContain('Password is required');
      
      component.handleSignIn();
      fixture.detectChanges();

      expect(container.innerHTML).toContain('UserName is required');
      expect(container.innerHTML).toContain('Password is required');
    });
  });

  describe('when fields pass local validation', () => {
    beforeEach(() => {
      component.userName = 'testUser';
      component.password = 'testPassword';
      // Reset the spy before each test
      userServiceMock.signIn.calls.reset();
    });

    it('calls userService.signIn with correct credentials', () => {
      component.handleSignIn();
      expect(component.loading).toBeTrue();
      expect(userServiceMock.signIn).toHaveBeenCalledWith('testUser', 'testPassword');
    });

    it('does not set error messages for valid input', () => {
      component.handleSignIn();
      expect(component.userNameHasErrors).toBeFalse();
      expect(component.passwordHasErrors).toBeFalse();
    });
  });

  describe('subscription behavior', () => {
    it('navigates to home when a user with a token is emitted', () => {
      // Spy on routeTo to verify navigation
      spyOn(component, 'routeTo').and.callThrough();
      // Simulate the user service emitting a valid user object with a token
      const userWithToken: User = { token: 'abc123' } as User;
      userServiceMock.user.next(userWithToken);
      fixture.detectChanges();
      expect(component.routeTo).toHaveBeenCalledWith('home');
    });

    it('sets signInError to true and loading to false when a 401 error is emitted', () => {
      // Simulate a 401 error from the user service
      userServiceMock.userServiceError.next({ statusCode: 401 });
      fixture.detectChanges();
      expect(component.signInError).toBeTrue();
      expect(component.loading).toBeFalse();
    });
  });

  describe('utility functions', () => {
    it('resetErrors should clear error flags and messages', () => {
      // Pre-set error flags and messages
      component.userNameHasErrors = true;
      component.userNameErrorMessage = 'error';
      component.passwordHasErrors = true;
      component.passwordErrorMessage = 'error';
      component.signInError = true;

      component.resetErrors();
      expect(component.userNameHasErrors).toBeFalse();
      expect(component.userNameErrorMessage).toBe('');
      expect(component.passwordHasErrors).toBeFalse();
      expect(component.passwordErrorMessage).toBe('');
      expect(component.signInError).toBeFalse();
    });

    it('formIsInvalid returns false when both fields are non-empty', () => {
      component.userName = 'someUser';
      component.password = 'somePassword';
      expect(component.formIsInvalid()).toBeFalse();
    });

    it('routeTo calls router.navigate with the correct route', () => {
      const navigateSpy = spyOn(router, 'navigate');
      component.routeTo('home');
      expect(navigateSpy).toHaveBeenCalledWith(['home']);
    });
  });
});
