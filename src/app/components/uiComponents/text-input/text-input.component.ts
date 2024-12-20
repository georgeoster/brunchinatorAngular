import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';

@Component({
  selector: 'brunch-text-input',
  imports: [FormsModule, NgIf, NgClass],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {

  @Input() text:string = '';
  @Output() textChange = new EventEmitter<string>();
  @Input() placeholder:string = '';
  @Input() field:string = '';
  @Input() type:string = 'text';
  @Input() icon:string = 'user';
  @Input() hasError:boolean = false;
  @Input() errorMessage:string = '';
  @Input() showForgotPassword:boolean = false;
  showPassword:boolean = false;

  leftIcon() {
    switch(this.icon) {
    case 'user': return '/user.png';
    case 'password': return '/password.png';
    default: return ''; 
    }
  }

  eyeBallIcon() {
    return this.showPassword ? '/showPassword.png' : '/hidePassword.png';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    this.type = this.showPassword ? 'text' : 'password';
  }
}
