import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavigationMenuComponent } from './navigation-menu.component';
import { provideHttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MenuService } from '../../../services/menu.service';
import { UserService } from '../../../services/user.service';
import { ROUTE_NAMES } from '../../../models/RouteNames';
import { NavigationMenuItem } from '../../../models/NavigationMenuItem';
import { User } from '../../../models/User';
import { dummyUser } from '../../../utils/tests/mocks';

describe('NavigationMenuComponent - Additional Tests', () => {
  let component: NavigationMenuComponent;
  let fixture: ComponentFixture<NavigationMenuComponent>;
  let routerStub: Partial<Router>;
  let menuServiceSubject: Subject<boolean>;
  let userServiceSubject: Subject<User>;
  let menuServiceStub: Partial<MenuService>;
  let userServiceStub: Partial<UserService>;

  beforeEach(async () => {
    menuServiceSubject = new Subject<boolean>();
    userServiceSubject = new Subject<User>();

    routerStub = {
      navigate: jasmine.createSpy('navigate')
    };

    menuServiceStub = {
      open: menuServiceSubject.asObservable(),
      openMenu: jasmine.createSpy('openMenu').and.callFake(() => {
        menuServiceSubject.next(true);
      }),
      closeMenu: jasmine.createSpy('closeMenu').and.callFake(() => {
        menuServiceSubject.next(false);
      })
    };

    userServiceStub = {
      user: userServiceSubject.asObservable()
    };

    await TestBed.configureTestingModule({
      imports: [NavigationMenuComponent],
      providers: [
        provideHttpClient(),
        { provide: Router, useValue: routerStub },
        { provide: MenuService, useValue: menuServiceStub },
        { provide: UserService, useValue: userServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should update iconFor correctly', () => {
    const testItem: NavigationMenuItem = { icon: 'home', label: 'Home', route: ROUTE_NAMES.HOME };
    const iconUrl = component.iconFor(testItem);
    expect(iconUrl).toEqual('/home.png');
  });

  it('should update showMenu when MenuService emits a new value', () => {
    // Emit true from the menu service observable
    menuServiceSubject.next(true);
    fixture.detectChanges();
    expect(component.showMenu).toBeTrue();

    // Emit false and check
    menuServiceSubject.next(false);
    fixture.detectChanges();
    expect(component.showMenu).toBeFalse();
  });

  it('should update menuItems when UserService emits a user with a token', () => {
    const testUser: User = dummyUser;
    userServiceSubject.next(testUser);
    fixture.detectChanges();

    // When a user is logged in, the menuItems should update accordingly.
    const expectedMenuItems = [
      { icon: 'home', label: 'Home', route: ROUTE_NAMES.HOME },
      { icon: 'addReview', label: 'Add Review', route: ROUTE_NAMES.ADD_REVIEW },
      { icon: 'review', label: 'View Reviews', route: ROUTE_NAMES.VIEW_REVIEWS },
      { icon: 'user', label: 'Profile', route: `${ROUTE_NAMES.PROFILE}/${testUser.userName}` }
    ];
    expect(component.menuItems).toEqual(expectedMenuItems);
  });

  it('should call router.navigate and closeMenu when routerHandler is invoked', () => {
    spyOn(component, 'closeMenu').and.callThrough();
    component.routerHandler(ROUTE_NAMES.HOME);
    expect(routerStub.navigate).toHaveBeenCalledWith([ROUTE_NAMES.HOME]);
    expect(component.closeMenu).toHaveBeenCalled();
  });

  it('should unsubscribe from subscriptions on ngOnDestroy', () => {
    spyOn(component.menuServiceSubscription, 'unsubscribe').and.callThrough();
    spyOn(component.userServiceSubscription, 'unsubscribe').and.callThrough();
    component.ngOnDestroy();
    expect(component.menuServiceSubscription.unsubscribe).toHaveBeenCalled();
    expect(component.userServiceSubscription.unsubscribe).toHaveBeenCalled();
  });
});
