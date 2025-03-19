import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { User } from '../../models/User';
import { UserService } from '../../services/user.service';
import { provideHttpClient } from '@angular/common/http';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let userServiceMock: any;
  let router: Router;

  beforeEach(async () => {
    // Create a mock for the UserService
    userServiceMock = {
      register: jasmine.createSpy('register'),
      user: new Subject<User>(),
      userServiceError: new Subject<any>()
    };

    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
      providers: [
        provideHttpClient(),
        { provide: UserService, useValue: userServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when fields do not pass local validation', () => {
    it('sets local error flags accordingly when fields are empty', () => {
      // Initially, there should be no errors.
      expect(component.emailHasErrors).toBeFalse();
      expect(component.userNameHasErrors).toBeFalse();
      expect(component.passwordHasErrors).toBeFalse();

      component.handleSignIn();
      fixture.detectChanges();

      expect(component.emailHasErrors).toBeTrue();
      expect(component.emailErrorMessage).toBe('Email is required');
      expect(component.userNameHasErrors).toBeTrue();
      expect(component.userNameErrorMessage).toBe('UserName is required');
      expect(component.passwordHasErrors).toBeTrue();
      expect(component.passwordErrorMessage).toBe('Password is required');
    });

    it('displays error messages in the template when fields are empty', () => {
      // Check that the error messages for empty fields appear in the rendered template.
      const containerBefore = fixture.debugElement.nativeElement.querySelectorAll('div')[2];
      expect(containerBefore.innerHTML).not.toContain('Email is required');
      expect(containerBefore.innerHTML).not.toContain('UserName is required');
      expect(containerBefore.innerHTML).not.toContain('Password is required');

      component.handleSignIn();
      fixture.detectChanges();

      const containerAfter = fixture.debugElement.nativeElement.querySelectorAll('div')[2];
      expect(containerAfter.innerHTML).toContain('Email is required');
      expect(containerAfter.innerHTML).toContain('UserName is required');
      expect(containerAfter.innerHTML).toContain('Password is required');
    });
  });

  describe('when fields pass local validation', () => {
    beforeEach(() => {
      component.email = 'test@example.com';
      component.userName = 'testUser';
      component.password = 'testPassword';
      userServiceMock.register.calls.reset();
    });

    it('calls userService.register with correct credentials', () => {
      component.handleSignIn();
      expect(component.loading).toBeTrue();
      expect(userServiceMock.register).toHaveBeenCalledWith('testUser', 'testPassword', 'test@example.com');
    });

    it('does not set error flags for valid input', () => {
      component.handleSignIn();
      expect(component.emailHasErrors).toBeFalse();
      expect(component.userNameHasErrors).toBeFalse();
      expect(component.passwordHasErrors).toBeFalse();
    });
  });

  describe('subscription behavior', () => {
    it('navigates to home when a user with a token is emitted', () => {
      spyOn(component, 'routeTo').and.callThrough();
      const userWithToken: User = { token: 'abc123' } as User;
      userServiceMock.user.next(userWithToken);
      fixture.detectChanges();
      expect(component.routeTo).toHaveBeenCalledWith('home');
    });

    it('sets registerError to true and loading to false when a 401 error is emitted', () => {
      userServiceMock.userServiceError.next({ statusCode: 401 });
      fixture.detectChanges();
      expect(component.registerError).toBeTrue();
      expect(component.loading).toBeFalse();
    });

    it('updates errorMessage and sets registerError when a 409 error is emitted', () => {
      const errorMsg = 'Username already taken';
      userServiceMock.userServiceError.next({ statusCode: 409, message: errorMsg });
      fixture.detectChanges();
      expect(component.errorMessage).toBe(errorMsg);
      expect(component.registerError).toBeTrue();
      expect(component.loading).toBeFalse();
    });
  });

  describe('utility functions', () => {
    it('resetErrors should clear error flags and messages', () => {
      // Pre-set error flags and messages.
      component.emailHasErrors = true;
      component.emailErrorMessage = 'error';
      component.userNameHasErrors = true;
      component.userNameErrorMessage = 'error';
      component.passwordHasErrors = true;
      component.passwordErrorMessage = 'error';
      component.registerError = true;

      component.resetErrors();

      expect(component.emailHasErrors).toBeFalse();
      expect(component.emailErrorMessage).toBe('');
      expect(component.userNameHasErrors).toBeFalse();
      expect(component.userNameErrorMessage).toBe('');
      expect(component.passwordHasErrors).toBeFalse();
      expect(component.passwordErrorMessage).toBe('');
      expect(component.registerError).toBeFalse();
    });

    it('formIsInvalid returns false when all fields are non-empty', () => {
      component.email = 'test@example.com';
      component.userName = 'testUser';
      component.password = 'testPassword';
      expect(component.formIsInvalid()).toBeFalse();
    });

    it('emailIsValid returns true for a valid email and false for an invalid email', () => {
      component.email = 'valid@example.com';
      expect(component.emailIsValid()).toBeTrue();
      component.email = 'invalid-email';
      expect(component.emailIsValid()).toBeFalse();
    });

    it('routeTo calls router.navigate with the correct route', () => {
      const navigateSpy = spyOn(router, 'navigate');
      component.routeTo('home');
      expect(navigateSpy).toHaveBeenCalledWith(['home']);
    });
  });
});
