import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { provideHttpClient } from '@angular/common/http';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInComponent],
      providers: [
        provideHttpClient()
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
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
  })
});
