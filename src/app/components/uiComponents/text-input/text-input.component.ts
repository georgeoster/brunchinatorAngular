import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../../utils/types/globalsConsts';

@Component({
  selector: 'brunch-text-input',
  imports: [FormsModule, NgClass],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {

  ROUTE_NAMES = ROUTE_NAMES;
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

  constructor(private router:Router) {}

  leftIcon() {
    switch(this.icon) {
    case 'user': return '/user.png';
    case 'password': return '/password.png';
    case 'email': return '/email.png';
    case 'number': return '/number.png';
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

  routeTo(route:string){
    this.router.navigate([route])
  }
}
