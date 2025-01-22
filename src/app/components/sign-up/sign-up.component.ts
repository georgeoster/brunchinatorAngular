import { Component } from '@angular/core';
import { CardComponent } from '../uiComponents/card/card.component';
import { TextInputComponent } from '../uiComponents/text-input/text-input.component';
import { ButtonComponent } from '../uiComponents/button/button.component';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from '../../utils/types/globalsConsts';
import { UserService } from '../../services/user.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { User } from '../../utils/types/all.types';
import { ErrorMessageComponent } from '../uiComponents/error-message/error-message.component';

@Component({
  selector: 'brunch-sign-up',
  imports: [CardComponent, TextInputComponent, ButtonComponent, NgIf, ErrorMessageComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  ROUTE_NAMES = ROUTE_NAMES;
  email:string = '';
  userName:string = '';
  password:string = '';
  emailHasErrors:boolean = false;
  userNameHasErrors:boolean = false;
  passwordHasErrors:boolean = false;
  emailErrorMessage:string = '';
  userNameErrorMessage:string = '';
  passwordErrorMessage:string = '';
  registerError:boolean = false;
  loading:boolean = false;
  errorMessage:string = 'Unable to register at this time.';

  userServiceErrorSubscription:Subscription = new Subscription;
  userServiceSubscription:Subscription = new Subscription;

  constructor(private router: Router, private userService: UserService) {
    this.subscribeToUserService();
    this.subscribeToUserServiceErrorSubscription();
  }

  ngOnDestroy() {
    this.userServiceSubscription.unsubscribe();
    this.userServiceErrorSubscription.unsubscribe();
  }

  subscribeToUserServiceErrorSubscription(){
    this.userServiceErrorSubscription = this.userService.userServiceError.subscribe((error) => {
      this.resetErrors();
      this.loading = false;
      if(error?.statusCode === 401) {
        this.registerError = true;
      }
    });
  }

  subscribeToUserService(){
    this.userServiceSubscription = this.userService.user.subscribe((user: User) => {
      if(user?.token?.length > 0) {
        this.resetErrors();
        this.routeTo('home');
      }
      this.loading = false;
    });
  }

  handleSignIn(){
    this.resetErrors();
    if (this.formIsInvalid()) {
      this.handleErrors();
      return;
    }
    this.loading = true;
    this.userService.register(this.userName, this.password, this.email);
  }

  resetErrors(){
    this.emailHasErrors = false;
    this.emailErrorMessage = '';
    this.userNameHasErrors = false;
    this.userNameErrorMessage = '';
    this.passwordHasErrors = false;
    this.passwordErrorMessage = '';
    this.registerError = false;
  }

  formIsInvalid(){
    if (this.email?.length < 1) return true;
    if (this.userName?.length < 1) return true;
    if (this.password?.length < 1) return true;
    return false;
  }

  emailIsValid() {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(this.email);
  }

  handleErrors(){
    if (this.userName?.length < 1) {
      this.userNameHasErrors = true;
      this.userNameErrorMessage = 'UserName is required';
    }
    if (this.password?.length < 1) {
      this.passwordHasErrors = true;
      this.passwordErrorMessage = 'Password is required';
    }
    if (this.email?.length < 1) {
      this.emailHasErrors = true;
      this.emailErrorMessage = 'Email is required';
      return;
    }
    if (!this.emailIsValid()) {
      this.emailHasErrors = true;
      this.emailErrorMessage = 'Email must be a valid email';
    }
  }

  routeTo(route:string){
    this.router.navigate([route])
  }
}

