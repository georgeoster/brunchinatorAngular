import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationMenuComponent } from './navigation-menu.component';
import { MenuService } from '../../../services/menu.service';

describe('NavigationMenuComponent', () => {
  let component: NavigationMenuComponent;
  let fixture: ComponentFixture<NavigationMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavigationMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavigationMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays list, calls routerHandler with appropriate route when clicked, and closes the menu', () => {
    spyOn(component, 'routerHandler').and.callThrough();
    spyOn(component, 'closeMenu').and.callThrough();
    
    const menuService:MenuService = TestBed.inject(MenuService);
    menuService.openMenu();

    expect(component.showMenu).toBeTrue();
    const items = fixture.debugElement.nativeElement.querySelectorAll('li');

    expect(items[0].innerHTML).toContain('Home');

    items[0].click();
    expect(component.routerHandler).toHaveBeenCalledWith('home');
    expect(component.closeMenu).toHaveBeenCalled();
    expect(component.showMenu).toBeFalse();
  });
});
