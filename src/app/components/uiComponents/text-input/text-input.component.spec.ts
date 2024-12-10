import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextInputComponent } from './text-input.component';

describe('TextInputComponent', () => {
  let component: TextInputComponent;
  let fixture: ComponentFixture<TextInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('error handling', () => {
    describe('when hasError is true', () => {
      it('applies error classes to container', () => {
        const container = fixture.debugElement.nativeElement.querySelector('div');

        expect(container.getAttribute('class')).toContain('container');
        expect(container.getAttribute('class')).not.toContain('container-error');

        component.hasError = true;
        fixture.detectChanges();

        expect(container.getAttribute('class')).toContain('container-error');
      });

      it('applies error classes to input wrapper', () => {
        const divs = fixture.nativeElement.querySelectorAll('div');
        const inputWrapper = divs[2];

        expect(inputWrapper.getAttribute('class')).toContain('input-wrapper');
        expect(inputWrapper.getAttribute('class')).not.toContain('input-wrapper-error');

        component.hasError = true;
        fixture.detectChanges();

        expect(inputWrapper.getAttribute('class')).toContain('input-wrapper-error');
      });

      it('displays error message', () => {
        component.hasError = true;
        component.errorMessage = 'some error message'
        fixture.detectChanges();

        const divs = fixture.nativeElement.querySelectorAll('div');
        const errorMessageDiv = divs[3];

        expect(errorMessageDiv.innerHTML).toContain('some error message');
      });
    });
  });

  describe('when icon is user', () => {
    it('does not display right side img', () => {
      component.icon = 'user';
      fixture.detectChanges();
      const imgs = fixture.nativeElement.querySelectorAll('img');
      expect(imgs.length).toBe(1);
    });

    it('displays correct img', () => {
      component.icon = 'user';
      fixture.detectChanges();
      const imgs = fixture.nativeElement.querySelectorAll('img');
      const userIcon = imgs[0];
      expect(userIcon.src).toContain('user.png');
    });
  });
  
  describe('when icon is password', () => {
    describe('eyeball icon', () => {
      it('toggles password visibility when clicked', () => {
        component.type = 'password';
        component.icon = 'password';
        fixture.detectChanges();
    
        const imgs = fixture.nativeElement.querySelectorAll('img');
        const eyeBallIcon = imgs[1];
    
        eyeBallIcon.click();
        expect(component.type).toBe('text');
    
        eyeBallIcon.click();
        expect(component.type).toBe('password');
      });
  
      it('toggles icon when clicked', () => {
        component.type = 'password';
        component.icon = 'password';
        fixture.detectChanges();
    
        const imgs = fixture.nativeElement.querySelectorAll('img');
        const eyeBallIcon = imgs[1];
    
        expect(eyeBallIcon.src).toContain('hidePassword.png')
  
        eyeBallIcon.click();
        fixture.detectChanges();
        expect(eyeBallIcon.src).toContain('showPassword.png')
    
        eyeBallIcon.click();
        fixture.detectChanges();
        expect(eyeBallIcon.src).toContain('hidePassword.png')
      });
    });
  });
});
