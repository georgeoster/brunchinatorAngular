import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserComponent } from './user.component';
import { ButtonComponent } from '../../formComponents/button/button.component';
import { By } from '@angular/platform-browser';

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('displays Sign In and Register buttons if user is not logged in', () => {
    expect(component.isLoggedIn).toBeFalse();
    const buttons = fixture.debugElement.queryAll(By.directive(ButtonComponent));
    const signInButton = buttons[0];
    const signUpButton = buttons[1];

    expect(signInButton.nativeElement.innerHTML).toContain('Sign In');
    expect(signUpButton.nativeElement.innerHTML).toContain('Register');
  });
});
