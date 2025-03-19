import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { ForgotPasswordComponent } from './forgot-password.component';
import { Router } from '@angular/router';
import { Subject, of } from 'rxjs';
import { UserService } from '../../services/user.service';
import { ROUTE_NAMES } from '../../models/RouteNames';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let routerStub: Partial<Router>;
  let userServiceStub: Partial<UserService>;

  // Create Subjects for the observables used in the component
  let resetPasswordEmailSentSubject: Subject<boolean>;
  let userServiceErrorSubject: Subject<any>;

  beforeEach(async () => {
    resetPasswordEmailSentSubject = new Subject<boolean>();
    userServiceErrorSubject = new Subject<any>();

    userServiceStub = {
      // These subjects simulate the observables
      resetPasswordEmailSent: resetPasswordEmailSentSubject.asObservable(),
      userServiceError: userServiceErrorSubject.asObservable(),
      // Stub the sendResetPasswordEmail method to simply return an observable (or do nothing)
      sendResetPasswordEmail: jasmine.createSpy('sendResetPasswordEmail').and.callFake((userName: string) => {
        // For testing, we can simply return an observable of true
        return of(true);
      })
    };

    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [ForgotPasswordComponent],
      providers: [
        provideHttpClient(),
        { provide: Router, useValue: routerStub },
        { provide: UserService, useValue: userServiceStub }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('formIsInvalid', () => {
    it('should return true when userName is empty', () => {
      component.userName = '';
      expect(component.formIsInvalid()).toBeTrue();
    });
    it('should return false when userName is not empty', () => {
      component.userName = 'testuser';
      expect(component.formIsInvalid()).toBeFalse();
    });
  });

  describe('handleErrors', () => {
    it('should set userNameHasErrors to true and userNameErrorMessage when userName is empty', () => {
      component.userName = '';
      component.handleErrors();
      expect(component.userNameHasErrors).toBeTrue();
      expect(component.userNameErrorMessage).toEqual('UserName is required');
    });
  });

  describe('resetErrors', () => {
    it('should reset error flags and messages', () => {
      // Set errors first
      component.userNameHasErrors = true;
      component.userNameErrorMessage = 'Error';
      component.sendEmailError = true;
      component.resetErrors();
      expect(component.userNameHasErrors).toBeFalse();
      expect(component.userNameErrorMessage).toEqual('');
      expect(component.sendEmailError).toBeFalse();
    });
  });

  describe('sendEmail', () => {
    it('should display errors and not call sendResetPasswordEmail if form is invalid', () => {
      spyOn(component, 'handleErrors').and.callThrough();
      // Set userName empty so form is invalid.
      component.userName = '';
      component.sendEmail();
      expect(component.handleErrors).toHaveBeenCalled();
      expect(userServiceStub.sendResetPasswordEmail).not.toHaveBeenCalled();
      expect(component.loading).toBeFalse();
    });

    it('should call sendResetPasswordEmail and set loading true if form is valid', () => {
      component.userName = 'validUser';
      component.sendEmail();
      expect(component.loading).toBeTrue();
      expect(userServiceStub.sendResetPasswordEmail).toHaveBeenCalledWith('validUser');
    });
  });

  describe('Subscription handling', () => {
    it('should reset errors, set loading false, and set sendEmailError to true when userServiceError emits an error with statusCode 401', () => {
      component.userNameHasErrors = false;
      component.sendEmailError = false;
      component.loading = true;
      // Emit an error with statusCode 401
      userServiceErrorSubject.next({
        statusCode: 401
      });
      fixture.detectChanges();
      expect(component.loading).toBeFalse();
      expect(component.sendEmailError).toBeTrue();
    });

    it('should reset errors and route to ROUTE_NAMES.RESET_PASSWORD when resetPasswordEmailSent emits true', () => {
      // Emit a successful reset email sent event.
      resetPasswordEmailSentSubject.next(true);
      fixture.detectChanges();
      expect(routerStub.navigate).toHaveBeenCalledWith([ROUTE_NAMES.RESET_PASSWORD]);
      expect(component.loading).toBeFalse();
    });

    it('should set sendEmailError to true and reset errors when resetPasswordEmailSent emits false', () => {
      component.sendEmailError = false;
      component.resetErrors(); // Ensure errors are cleared
      resetPasswordEmailSentSubject.next(false);
      fixture.detectChanges();
      expect(component.sendEmailError).toBeTrue();
      expect(component.loading).toBeFalse();
    });
  });

  describe('routeTo', () => {
    it('should navigate to the provided route', () => {
      component.routeTo('home');
      expect(routerStub.navigate).toHaveBeenCalledWith(['home']);
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from Subscriptions', () => {
      spyOn(component.userServiceErrorSubscription, 'unsubscribe').and.callThrough();
      spyOn(component.userServiceSubscription, 'unsubscribe').and.callThrough();
      component.ngOnDestroy();
      expect(component.userServiceErrorSubscription.unsubscribe).toHaveBeenCalled();
      expect(component.userServiceSubscription.unsubscribe).toHaveBeenCalled();
    });
  });
});
