import { ComponentFixture, TestBed, fakeAsync, tick, waitForAsync } from '@angular/core/testing';
import { ProfileComponent } from './profile.component';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of, Subject } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { dummyUser } from '../../../utils/tests/mocks';

describe('ProfileComponent', () => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let activatedRouteStub: Partial<ActivatedRoute>;
  let userServiceStub: Partial<UserService>;
  let userSubject: Subject<User>;

  beforeEach(waitForAsync(() => {
    // Create a subject to simulate the user observable.
    userSubject = new Subject<User>();

    // ActivatedRoute stub: simulate a route with parameter userName.
    activatedRouteStub = {
      paramMap: of(convertToParamMap({ userName: 'tester' }))
    };

    // UserService stub: expose the user observable.
    userServiceStub = {
      user: userSubject.asObservable()
    };

    TestBed.configureTestingModule({
      imports: [ProfileComponent],
      providers: [
        provideHttpClient(),
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: UserService, useValue: userServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should set userName from ActivatedRoute paramMap on ngOnInit', () => {
      component.ngOnInit();
      expect(component.userName).toEqual('tester');
    });

    it('should update profileIsSignedInUser based on userService subscription', fakeAsync(() => {
      // Initially, profileIsSignedInUser is false
      component.ngOnInit();
      expect(component.profileIsSignedInUser).toBeFalse();

      // Emit a user from userService with matching userName.
      userSubject.next(dummyUser);
      tick();
      fixture.detectChanges();
      // Since the route parameter 'tester' matches dummyUser.userName, profileIsSignedInUser should be true.
      expect(component.signedInUser).toEqual(dummyUser);
      expect(component.profileIsSignedInUser).toBeTrue();
    }));
  });

  describe('Subscription Cleanup', () => {
    it('should unsubscribe from subscriptions on ngOnDestroy', () => {
      spyOn(component.userServiceSubscription, 'unsubscribe').and.callThrough();
      spyOn(component.paramMapSubscription, 'unsubscribe').and.callThrough();
      component.ngOnDestroy();
      expect(component.userServiceSubscription.unsubscribe).toHaveBeenCalled();
      expect(component.paramMapSubscription.unsubscribe).toHaveBeenCalled();
    });
  });
});
